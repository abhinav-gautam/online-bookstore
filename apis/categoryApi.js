const express = require("express")
const asyncHandler = require("express-async-handler")
const verifyToken = require("./middlewares/verifyToken");

const router = express.Router()

let category;

// Middleware to get category collection object from app locals
router.use((req, res, next) => {
    category = req.app.get("category")
    next()
})

// Get all categories
router.get("/", asyncHandler(async (req, res) => {
    const categories = await category.find().toArray()
    res.status(200).json({
        status: "success",
        payload: {
            categories
        }
    })
}))

module.exports = router