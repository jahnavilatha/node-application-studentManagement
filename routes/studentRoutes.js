const express = require('express');
const studentController = require('../controllers/studentController');
 
const router = express.Router();
 
router
  .route('/')
  .post(studentController.createStudent)
  .get(studentController.getAllStudents);
 
router
  .route('/:id')
  .get(studentController.getStudentById)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);
 
module.exports = router;