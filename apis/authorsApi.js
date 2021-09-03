const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()

let authors;

// Middleware to get authors collection object from app locals
router.use((req, res, next) => {
    authors = req.app.get("authors")
    next()
})

// Get featured authors
router.get("/", asyncHandler(async (req, res) => {
    const query = authors.find()

    // Limiting results
    if (req.query.limit) {
        query.limit(+req.query.limit)
    }

    const authorsArray = await query.toArray()
    res.status(200).json({
        status: "success",
        payload: {
            authors: authorsArray
        }
    })
}))


module.exports = router
