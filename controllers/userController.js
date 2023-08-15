const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//login user
const loginUser = async (req, res) => {
	//
	res.json({ msg: "Login successfully" })
}

//signup user
const signupUser = async (req, res) => {
	//
	const { email, password } = req.body
	const exists = await User.findOne({ email })

	if (exists) {
		throw Error("Email exists")
	}
	try {
		const saltRound = 10

		const salt = await bcrypt.genSalt(saltRound)
		const hash = await bcrypt.hash(password, salt)

		const user = await User.create({
			email,
			password: hash
		})

		res.status(200).json({ email, user })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { loginUser, signupUser }
