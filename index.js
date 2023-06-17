const express = require('express')
const auth_route = require('.routes/auth')
require('dotenv').config()

const app= express()

app.use("/api",auth_route)

const port = process.env.PORT || 3200

app.listen(port,()=> console.log(`server running on port ${port}`))
