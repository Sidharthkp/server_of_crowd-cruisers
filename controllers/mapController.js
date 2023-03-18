//js
const Pin = require("../models/MapPin");


//For Creating a Pin
const newPin = async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err)
    }
}

//get all pins
const getPin = async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deletePin = async (req, res) => {
    try{
        const deletePin = await Pin.findOneAndDelete({_id: req.body.id})
        res.status(200).json(deletePin)
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    newPin,
    getPin,
    deletePin
};