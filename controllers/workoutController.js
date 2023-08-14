const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

//All workout
const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({ createdAt: -1 })
	res.status(200).json(workouts)
}
//Single workout

const getSingleWorkout = async (req, res) => {
	const { id } = req.params

	//check the validity of the id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" })
	}

	const workout = await Workout.findById(id)
	if (!workout) {
		return res.status(404).json({ error: "No such workout" })
	}
	res.status(200).json(workout)
}

//Create new workout
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body

	try {
		const workout = await Workout.create({ title, load, reps })
		res.status(200).json(workout)
	} catch (error) {
		console.log(error)
		console.log("THis is the error")
		return res.status(400).json({ error: error.message })
	}
}
//Delete workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" })
	}

	try {
		const workout = await Workout.findOneAndDelete({ _id: id })

		res.status(200).json({
			success: true,
			message: "Workout deleted successfully",
			workout
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "Error while deleting",
			error
		})
	}
}
//Update workout

const updateWorkout = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" })
	}
	const workout = await Workout.findOneAndUpdate(
		{ _id: id },
		{
			...req.body
		}
	)
	if (!workout) {
		return res.status(404).json({ error: "No such workout" })
	}
	res.status(200).json(workout)
}

module.exports = {
	createWorkout,
	getWorkouts,
	getSingleWorkout,
	deleteWorkout,
	updateWorkout
}
