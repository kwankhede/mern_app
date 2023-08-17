const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

// Student Model
const studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    const student = await studentSchema.create(req.body);
    console.log(student);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// READ Students
router.get("/", async (req, res, next) => {
  try {
    const students = await studentSchema.find();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get(async (req, res, next) => {
    try {
      const student = await studentSchema.findById(req.params.id);
      res.json(student);
    } catch (error) {
      next(error);
    }
  })

  // Update Student Data
  .put(async (req, res, next) => {
    try {
      const updatedStudent = await studentSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } // Return the updated document
      );
      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  });

// Delete Student
router.delete("/delete-student/:id", async (req, res, next) => {
  try {
    const deletedStudent = await studentSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg: deletedStudent,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
