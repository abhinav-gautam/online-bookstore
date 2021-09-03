const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()

let books;

// Middleware to get books collection object from app locals
router.use((req, res, next) => {
    books = req.app.get("books")
    next()
})

// Get featured books
router.get("/featured/:tag", asyncHandler(async (req, res) => {
    const tag = req.params.tag
    const featuredBooks = await books.find({ tags: { $regex: tag } }).limit(4).toArray()
    res.status(200).json({
        status: "success",
        payload: {
            [tag]: featuredBooks
        }
    })
}))


module.exports = router
