import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },


  notebookId: { type: String },
  color: { type: String },
  body: { type: String },
  userId: { type: String },
});

export default mongoose.model("Note", noteSchema);
