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
    const { book, quantity } = req.body
    const username = req.username
    // Getting cart corresponding to the username
    const userCart = await cart.findOne({ username })
    // If cart already exists
    if (userCart) {
        // Checking if book already exists - Inc qty if already exists
        if (JSON.stringify(userCart).includes(JSON.stringify(book))) {
            await cart.updateOne({ "username": username, "cart.book": book }, { $inc: { "cart.$.quantity": quantity } })
        }
        // Adding to cart if not exists 
        else {
            await cart.updateOne({ username }, { $push: { cart: { book, quantity } } })
        }
    }
    // Inserting new cart if username doesn't exists
    else {
        await cart.insertOne({ username, cart: [{ book, quantity }] })
    }
    res.status(201).json({
        status: "success",
        message: "item added"
    })
}))

// Get all items from cart collection
router.get("/getItems", verifyToken, asyncHandler(async (req, res) => {
    const username = req.username
    const items = await cart.findOne({ username })
    res.status(200).json({
        status: "success",
        items: items.cart
    })
}))

// Remove item from the cart collection
router.post("/removeItem", verifyToken, asyncHandler(async (req, res) => {
    const { book } = req.body
    const username = req.username
    await cart.updateOne({ username }, { $pull: { cart: { "book": book } } })
    res.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

// Update Cart Quantity
router.post("/updateQty", verifyToken, asyncHandler(async (req, res) => {
    const { book, quantity } = req.body
    const username = req.username
    await cart.updateOne({ "username": username, "cart.book": book }, { $set: { "cart.$.quantity": quantity } })
    res.status(201).json({
        status: "success",
        message: "quantity updated"
    })
}))




module.exports = router