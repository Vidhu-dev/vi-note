import UserModal from '../models/user.js'
export const createNotebook = async (req, res) => {
  console.log(' createNotebook called ')
  const { description, title, color } = req.body
  const _id = req.userId
  console.log(req.body)
  try {
    const oldUser = await UserModal.findById(_id)
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" })
    }
    if (oldUser) {
      const createNotebook = {
        title,
        description,
        color,
        createdAt: new Date(),
      }
      const user = await UserModal.findById(_id)
      console.log(user)
      user.notebooks.push({
        title: title,
        description: description,
        color: color,
        createdAt: new Date(),
      })
      const doc = await user.save()
      if (!doc) console.log('error in saving')
      console.log(doc)
      res.status(202).json({ message: `Notebook ${createNotebook} is created` })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went worng' })
    console.log(error)
  }
}

export const updateNoteBook = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  console.log('Updating nootebook', id)
  const { name, color, date } = req.body

  try {
    const user = await UserModal.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const notebook = user.notebooks.find((notebook) => notebook.id === id)

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    if (name) notebook.name = name
    if (color) notebook.color = color
    if (date) notebook.date = date

    await user.save()

    res.status(200).json({ message: 'Notebook updated successfully', notebook })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const deleteNotebook = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  console.log('Deleting notebook', id)
  try {
    const user = await UserModal.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }
    const notebookIndex = user.notebooks.findIndex(
      (notebook) => notebook.id === id
    )
    if (notebookIndex === -1) {
      return res.status(404).json({ message: 'Notebook not found' })
    }
    user.notebooks.splice(notebookIndex, 1)
    await user.save()
    res.status(200).json({ message: 'Notebook deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getNotebooks = async (req, res) => {
  const userId = req.userId
  try {
    const oldUser = await UserModal.findById(userId, 'notebooks')
    res.status(200).json(oldUser.notebooks)
  } catch (error) {
    res.status(501).json({ message: 'Something went worng' })
    console.log(error)
  }
}

export const filterNotebooks = async (req, res) => {
  const userId = req.userId
  const { filter } = req.params

  try {
    const user = await UserModal.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const notebooks = user.notebooks
    let filteredNotebooks = []

    const today = new Date()
    const startOfWeek = new Date(today)
    const endOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())) // Saturday

    switch (filter) {
      case 'all':
        filteredNotebooks = notebooks
        break

      case 'todays':
        filteredNotebooks = notebooks.filter((notebook) => {
          const notebookDate = new Date(notebook.createdAt)
          return (
            notebookDate.getFullYear() === today.getFullYear() &&
            notebookDate.getMonth() === today.getMonth() &&
            notebookDate.getDate() === today.getDate()
          )
        })
        break

      case 'week':
        filteredNotebooks = notebooks.filter((notebook) => {
          const notebookDate = new Date(notebook.createdAt)
          return notebookDate >= startOfWeek && notebookDate <= endOfWeek
        })
        break

      case 'month':
        filteredNotebooks = notebooks.filter((notebook) => {
          const notebookDate = new Date(notebook.createdAt)
          return (
            notebookDate.getMonth() === today.getMonth() &&
            notebookDate.getFullYear() === today.getFullYear()
          )
        })
        break

      default:
        return res.status(400).json({ message: 'Invalid filter option' })
    }

    return res.status(200).json({ notebooks: filteredNotebooks })
  } catch (error) {
    console.error('Error filtering notebooks:', error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getNotebook = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  try {
    const user = await UserModal.findById(userId)
    const result = user.notebooks.id(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(501).json({ message: 'Something went worng' })
    console.log(error)
  }
}
