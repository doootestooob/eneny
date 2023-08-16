const mongoose = require('mongoose');

const shopcartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lefttime: {
        type: Number,
        required: true
    },
    omurice: {
        type: Number,
        
    },
    muffin: {
        type: Number,
        
    },
    melaleuca: {
        type: Number,
        
    },
    pizza: {
        type: Number,
        
    },
    pasta: {
        type: Number,
        
    },
    stew: {
        type: Number,
        
    },
    finish: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Shopcart = mongoose.model('Shopcart', shopcartSchema);

module.exports = Shopcart;



