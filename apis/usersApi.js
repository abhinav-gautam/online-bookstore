const express = require("express")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const verifyToken = require("./middlewares/verifyToken");
const multerObj = require("./middlewares/saveImage")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const ObjectId = require("mongodb").ObjectId

const router = express.Router()

let users;

// Get users from the app
router.use((req, res, next) => {
    users = req.app.get("users")
    next()
})

// Register route
router.post("/register", asyncHandler(async (req, res) => {
    let newUser = req.body
    // Decrypting the user object
    newUser = JSON.parse(CryptoJS.AES.decrypt(newUser.user, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
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

// Login Route
router.post("/login", asyncHandler(async (req, res) => {
    let userCred = req.body
    // Decrypting the user object
    userCred = JSON.parse(CryptoJS.AES.decrypt(userCred.user, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
    // Authenticating username
    let userAlreadyExists = await users.findOne({ username: userCred.username })
    if (!userAlreadyExists) {
        throw new Error("invalid username")
    }
    // Authenticating password
    const isPasswordOk = bcrypt.compareSync(userCred.password, userAlreadyExists.password)
    if (!isPasswordOk) {
        throw new Error("invalid password")
    }
    // Deleting the password from the user
    delete userAlreadyExists.password
    // Encrypting the user
    userAlreadyExists = CryptoJS.AES.encrypt(JSON.stringify(userAlreadyExists), process.env.REACT_APP_SECRET_CRYPTO).toString()
    // Generating token
    const signedToken = jwt.sign({ username: userCred.username }, process.env.SECRET_JWT, { expiresIn: "10d" })
    res.status(200).json({
        status: "success",
        token: signedToken,
        user: userAlreadyExists
    })
}))

// Update User
router.put("/update", verifyToken, multerObj.single("profilePicture"), asyncHandler(async (req, res) => {
    // Decrypting the user
    let user = JSON.parse(CryptoJS.AES.decrypt(req.body.user, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
    // Setting the profile picture if exists
    if (req.file) {
        user.profilePicture = req.file.path
    }
    // Checking if username is changed
    if (user.username !== user.cartUsername) {
        // Checking if username already exists
        const userDb = await users.findOne({ username: user.username })
        if (userDb) {
            throw new Error("username not available")
        }
        // If username is available changing the username in cart collection
        await req.app.get("cart").updateOne({ username: user.cartUsername }, { $set: { username: user.username } })
    }
    // Getting the user id in var and deleting it from the obj for updation
    const userId = user._id
    delete user._id
    delete user.cartUsername
    await users.updateOne({ _id: new ObjectId(userId) }, { $set: user })
    // Again adding the user id
    user._id = userId
    // Encrypting the user
    user = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.REACT_APP_SECRET_CRYPTO).toString()
    res.status(201).json({
        status: "success",
        message: "user updated",
        user
    })
}))

module.exports = router
