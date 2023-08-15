require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

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
const userRoutes = require("./Routes/users")

//middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

//Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)
