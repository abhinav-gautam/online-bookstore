const express = require("express")
const asyncHandler = require("express-async-handler")
const verifyToken = require("./middlewares/verifyToken");
const ObjectId = require("mongodb").ObjectId

const router = express.Router()

let categories;

// Middleware to get category collection object from app locals
router.use((req, res, next) => {
    categories = req.app.get("category")
    next()
})

// Get all categories
router.get("/", asyncHandler(async (req, res) => {
    const categoriesArray = await categories.find().toArray()
    res.status(200).json({
        status: "success",
        payload: {
            categories: categoriesArray
        }
    })
}))

// Add category
router.post("/addCategory", verifyToken, asyncHandler(async (req, res) => {
    const category = req.body
    await categories.insertOne(category)
    res.status(201).json({
        status: "success",
        message: "category added"
    })
}))

// Delete category
router.post("/deleteCategory", verifyToken, asyncHandler(async (req, res) => {
    const category = req.body
    await categories.deleteOne({ categoryName: category.categoryName })
    res.status(200).json({
        status: "success",
        message: "category deleted"
    })
}))

// Update category
router.post("/updateCategory", verifyToken, asyncHandler(async (req, res) => {
    const category = req.body
    await categories.updateOne({ _id: new ObjectId(category._id) }, { $set: { categoryName: category.categoryName } })
    res.status(200).json({
        status: "success",
        message: "category deleted"
    })
}))
module.exports = router