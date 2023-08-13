const express = require("express")
const { createWorkout, getSingleWorkout, getWorkouts, deleteWorkout, updateWorkout } = require("../controllers/workoutController")
const router = express.Router()

//Routes

//gets all workout
router.get("/", getWorkouts)
//get single workout
router.get("/:id", getSingleWorkout)

//post workout
router.post("/", createWorkout)

//delete single workout
router.delete("/:id", deleteWorkout)

//update single workout
router.patch("/:id", updateWorkout)

module.exports = router
