import mongoose from 'mongoose'

const notebookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  color: { type: String },
})
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  id: { type: String },
  notebooks: [notebookSchema],
})

export default mongoose.model('User', userSchema)
