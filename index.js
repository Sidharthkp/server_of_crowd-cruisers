const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")
const cors = require('cors');
const { Server } = require('socket.io');
http = require('http');

const server = http.createServer(app); // Add this

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/pins", pinRoute)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // We can write our socket event listeners in here...
});

server.listen(3000, () => {
    console.log("Server has started at 3000");
})