const express = require("express")
const morgan = require("morgan")
require("dotenv").config()

// Express App
const app = express()

// React app connection
app.use(express.static(`${__dirname}/build`))

// Logging
app.use(morgan("dev"))

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