const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()

let users;

// Get users from the app
router.use((req, res, next) => {
    users = req.app.get("users")
    next()
})

// Register route
router.post("/register", asyncHandler(async (req, res) => {
    const newUser = req.body
    // Checking if username already exists
    const userAlreadyExists = await users.findOne({ username: newUser.username })
    if (userAlreadyExists) {
        throw new Error("user already exists")
    }

    // Inserting into database
    await users.insertOne(newUser)
    res.status(201).json({
        status: "success",
        message: "user created"
    })
}))

module.exports = router
