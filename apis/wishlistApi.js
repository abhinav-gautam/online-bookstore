const express = require("express")
const asyncHandler = require("express-async-handler");
const verifyToken = require("./middlewares/verifyToken");

const router = express.Router()

let wishlist;

// Middleware to get wishlist collection object from app locals
router.use((req, res, next) => {
    wishlist = req.app.get("wishlist")
    next()
})

// Add item to wishlist collection
router.post("/addItem", verifyToken, asyncHandler(async (req, res) => {
    const { book } = req.body.book
    const username = req.username
    await wishlist.updateOne({ username }, { $addToSet: { wishlist: book } }, { upsert: true })
    res.status(201).json({
        status: "success",
        message: "item added"
    })
}))

// Get all items from wishlist collection
router.get("/getItems", verifyToken, asyncHandler(async (req, res) => {
    const username = req.username
    const items = await wishlist.findOne({ username })
    res.status(200).json({
        status: "success",
        items: items?.wishlist,
        wishlistUsername: items.username
    })
}))

// Remove item from the wishlist collection
router.post("/removeItem", verifyToken, asyncHandler(async (req, res) => {
    const { book } = req.body
    const username = req.username
    await wishlist.updateOne({ username }, { $pull: { wishlist: book } })
    res.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

module.exports = router
