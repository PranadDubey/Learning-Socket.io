//Packages

import express from "express"
import http, { createServer } from "http"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { Server } from "socket.io"

//Instances

const app = express()
const server = http.createServer(app)
const io = new Server(server)

//Serving HTML File

const __dirname = dirname(fileURLToPath(import.meta.url))
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

//Connection Event Handler

io.on("connection", (socket) => {
  console.log("User connected to (server)")
})

//Start a Server
const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
