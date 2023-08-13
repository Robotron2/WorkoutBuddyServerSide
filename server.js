require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

//mongoose connect
mongoose
	.connect(process.env.MONGO_LOCAL)
	.then(() => {
		console.log("Connected to mongoLocal")
		app.listen(process.env.PORT, () => {
			console.log("Listening on port,", process.env.PORT)
		})
	})
	.catch((err) => {
		console.log(err)
	})

const workoutRoutes = require("./Routes/workouts")

//middleware

app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

//Routes
app.use("/api/workouts", workoutRoutes)
