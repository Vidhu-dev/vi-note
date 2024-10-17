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
