const multerObj = require("./middlewares/saveImage")
const verifyToken = require("./middlewares/verifyToken");
const express = require("express")
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongodb").ObjectId
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

// Add a book
router.post("/addBook", verifyToken, multerObj.single("bookImage"), asyncHandler(async (req, res) => {
    const book = JSON.parse(req.body.book)
    book.bookImage = req.file.path
    await books.insertOne(book)
    res.status(201).json({
        status: "success",
        message: "book added",
        book
    })
}))

// Update a book
router.post("/updateBook", verifyToken, multerObj.single("bookImage"), asyncHandler(async (req, res) => {
    const book = JSON.parse(req.body.book)
    if (req.file) {
        book.bookImage = req.file.path
    }
    const bookId = book._id
    delete book._id
    await books.updateOne({ _id: new ObjectId(bookId) }, { $set: book })
    book._id = bookId
    res.status(201).json({
        status: "success",
        message: "book added",
        book
    })
}))

// Delete a book
router.post("/deleteBook", verifyToken, asyncHandler(async (req, res) => {
    const bookId = req.body._id
    await books.deleteOne({ _id: new ObjectId(bookId) })
    res.status(201).json({
        status: "success",
        message: "book added",
    })
}))

module.exports = router
