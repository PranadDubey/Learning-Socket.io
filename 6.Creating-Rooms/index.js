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
var full = 0
var roomno = 1

io.on("connection", (socket) => {
  console.log("User connected to (server)")

  //Creating a room
  socket.join("roomno-" + roomno)

  io.sockets.in("roomno-" + roomno).emit("customEvent", "Connected to room number - " + roomno)

  full++
  if (full >= 2) {
    full = 0
    roomno++
  }

  //Handle Disconnect Event
  socket.on("disconnect", () => {
    console.log("Disconnected from Server")
  })
})

//Start a Server
const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
