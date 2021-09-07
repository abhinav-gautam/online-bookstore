const express = require("express")
const morgan = require("morgan")
const booksApi = require("./apis/booksApi")
const categoryApi = require("./apis/categoryApi")
const authorsApi = require("./apis/authorsApi")
const usersApi = require("./apis/usersApi")
const cartApi = require("./apis/cartApi")
const mongoClient = require("mongodb").MongoClient
const cors = require("cors")
require("dotenv").config()

// Express App
const app = express()

// Cors
app.use(cors())

// React app connection
app.use(express.static(`${__dirname}/build`))

// Logging
app.use(morgan("dev"))

// Body Parser
app.use(express.json())

// MongoDB Connection
const DATABASE_URL = process.env.DATABASE_URL;
(async () => {
    const client = await mongoClient.connect(DATABASE_URL)

    // Get db object
    const onlineBookstoreDb = client.db("onlineBookstore")

    // Get collections object
    const books = onlineBookstoreDb.collection("booksCollection")
    const category = onlineBookstoreDb.collection("categoryCollection")
    const authors = onlineBookstoreDb.collection("authorsCollection")
    const cart = onlineBookstoreDb.collection("cartCollection")
    const users = onlineBookstoreDb.collection("usersCollection")

    // Set to app object
    app.set("books", books)
    app.set("category", category)
    app.set("authors", authors)
    app.set("users", users)
    app.set("cart", cart)

    console.log("[+] Database Connected");
})()

// APIs
app.use("/books", booksApi)
app.use("/category", categoryApi)
app.use("/authors", authorsApi)
app.use("/cart", cartApi)
app.use("/users", usersApi)

// Error Handler Route
app.use((err, req, res, next) => {
    console.log("[-] Error: ", err.message);
    res.status(200).json({
        status: "failed",
        message: err.message
    })
})

// Default path
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`)
})

// Express app listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`[+] Server started on port ${PORT}`);
})