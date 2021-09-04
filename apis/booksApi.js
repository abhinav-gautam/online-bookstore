const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()

let books;

// Middleware to get books collection object from app locals
router.use((req, res, next) => {
    books = req.app.get("books")
    next()
})

// Get all the books
router.get("/", asyncHandler(async (req, res) => {
    const allBooks = await books.find().toArray()
    res.status(200).json({
        status: "success",
        payload: {
            books: allBooks
        }
    })
}))
module.exports = router
