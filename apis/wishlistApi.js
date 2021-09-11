const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()

let wishlist;

// Middleware to get wishlist collection object from app locals
router.use((req, res, next) => {
    wishlist = req.app.get("wishlist")
    next()
})


module.exports = router
