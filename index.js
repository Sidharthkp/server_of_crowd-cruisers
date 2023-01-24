const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/mapPins", pinRoute)

app.listen(3000, () => {
    console.log("Server has started at 3000");
})