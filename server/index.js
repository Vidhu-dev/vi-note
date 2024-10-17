import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/user.js';
import notebookRouter from './routes/notebook.js';
import noteRouter from './routes/note.js';
import dotenv from 'dotenv/config'

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.use('/note', noteRouter);
app.use('/users', userRouter);
app.use('/notebook', notebookRouter);



const port = 5000;

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
