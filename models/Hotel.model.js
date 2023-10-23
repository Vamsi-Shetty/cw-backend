const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, required: true },
    reviewCount: { type: Number},
    carousel: { type: Array, required: true },
  });

const Hotelmodel = mongoose.model("hotel", hotelSchema)

module.exports = {Hotelmodel}