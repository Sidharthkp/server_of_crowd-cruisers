const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/pins", pinRoute)


app.listen(3000, () => {
    console.log("Server has started at 3000");
})