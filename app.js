const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./models/student');  // Importing the student model

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// API Routes
// Add a new student
app.post('/students', async (req, res) => {
    try {
      const student = new Student(req.body);  // Create a new student using the request body
      const savedStudent = await student.save();  // Save the student to the database
      res.status(201).json(savedStudent);  // Send the saved student as a response
    } catch (err) {
      res.status(400).json({ error: err.message });  // If there's an error, send an error response
    }
  });

  // Get all students
app.get('/students', async (req, res) => {
    try {
      const students = await Student.find();  // Retrieve all students from the database
      res.json(students);  // Send the students as a response
    } catch (err) {
      res.status(500).json({ error: err.message });  // If there's an error, send an error response
    }
  });

  // Get a single student by ID
app.get('/students/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);  // Retrieve student by ID
      if (!student) return res.status(404).json({ message: 'Student not found' });  // If not found, return 404
      res.json(student);  // Send the student as a response
    } catch (err) {
      res.status(500).json({ error: err.message });  // If there's an error, send an error response
    }
  });

  // Update a student
app.put('/students/:id', async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
      res.json(updatedStudent);  // Send the updated student as a response
    } catch (err) {
      res.status(400).json({ error: err.message });  // If there's an error, send an error response
    }
  });

  // Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);  // Delete student by ID
      if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
      res.json({ message: 'Student deleted successfully' });  // Send a success message
    } catch (err) {
      res.status(500).json({ error: err.message });  // If there's an error, send an error response
    }
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  
