const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
	//verify authentication
	const { authorization } = req.headers

	try {
		if (!authorization || authorization == undefined) {
			// res.status(401).json({ error:  })
			throw Error("Authorization required")
		}
		const token = authorization.split(" ")[1]

		if (!token) {
			throw Error("Error while splitting")
		}

		const { _id } = jwt.verify(token, process.env.JWTSECRET)

		if (!_id) {
			throw Error("JWT malformed!")
		}

		req.user = await User.findOne({ _id }).select("_id")
		next()
	} catch (error) {
		res.status(401).json({ error: error.message })
		console.log(error)
	}
}

module.exports = requireAuth
