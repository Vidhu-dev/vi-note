import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModal from '../models/user.js'

const secret = 'testing'

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body
  try {
    const oldUser = await UserModal.findOne({ email })
    if (oldUser) {
      return res.status(400).json({ message: 'User already exist' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })
    const token = jwt.sign({ email: result.email, id: result.id }, secret, {
      expiresIn: '2h',
    })
    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: ' Something went worng' })
    console.log(error)
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const oldUser = await UserModal.findOne({ email })
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" })
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    })
    res.status(200).json({ result: oldUser, token })
  } catch (error) {
    res.status(500).json({ message: ' Something went worng' })
    console.log(error)
  }
}

export const tokenValidation = async (req, res) => {
  const authHeader = req.headers.authorization
  console.log('Checking token validity', authHeader)
  if (!authHeader) {
    return res
      .status(401)
      .json({ tokenValid: false, message: 'No token provided' })
  }

  try {
    const decodedData = jwt.verify(authHeader, secret)
    return res.status(200).json({ tokenValid: true, decodedData })
  } catch (error) {
    console.error('Token validation error:', error)
    return res.status(401).json({ tokenValid: false, message: 'Invalid token' })
  }
}
