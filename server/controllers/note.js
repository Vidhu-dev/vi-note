import NoteModal from "../models/note.js";

export const createNote = async (req, res) => {
  const { title, notebookId, color } = req.body;
  const userId = req.userId;
  try {
    const result = await NoteModal.create({
      title,
      notebookId,
      color,
      createdAt: new Date(),
      userId,
      body: "",
    });
    console.log(result);
    res.status(202).json({ message: `Notebook ${createNote} is created` });
  } catch (error) {
    res.status(500).json({ message: " Something went worng" });
    console.log(error);
  }
};

export const getNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await NoteModal.find({ userId: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: "Something went worng" });
    console.log(error);
  }
};

export const getNotesByNotebook = async (req, res) => {
  const { id } = req.params;
  console.log("heellooo");
  console.log(id);
  const userId = req.userId;
  try {
    const result = await NoteModal.find({ notebookId: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: "Something went worng" });
    console.log(error);
  }
};
export const getNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const result = await NoteModal.findById(id);
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: "Something went worng" });
    console.log(error);
  }
};
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const noteData = req.body;
  const userId = req.userId;
  try {
    const result = await NoteModal.findByIdAndUpdate(id, {
      body: noteData.body,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: "Something went worng" });
    console.log(error);
  }
};
