const express = require("express")
const asyncHandler = require("express-async-handler")
const verifyToken = require("./middlewares/verifyToken");

const router = express.Router()

let cart;

// Middleware to get cart collection object from app locals
router.use((req, res, next) => {
    cart = req.app.get("cart")
    next()
})

// Add item to cart collection
router.post("/addItem", verifyToken, asyncHandler(async (req, res) => {
    const { book } = req.body
    const username = req.username
    if (await cart.findOne({ username })) {
        await cart.update({ username }, { $push: { cart: book } })
    } else {
        await cart.insertOne({ username, cart: [book] })
    }
    res.status(201).json({
        status: "success",
        message: "item added"
    })
}))

// Get all items from cart collection
router.get("/getItems", verifyToken, asyncHandler(async (req, res) => {
    const username = req.username
    const items = await cart.find({ username }).toArray()
    res.status(200).json({
        status: "success",
        items: items[0].cart
    })
}))

// Remove item from the cart collection
router.post("/removeItem", verifyToken, asyncHandler(async (req, res) => {
    const { book } = req.body
    const username = req.username
    await cart.update({ username }, { $pull: { cart: book } })
    res.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))




module.exports = router