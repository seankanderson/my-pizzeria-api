const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: Date
});

const topping = new Schema({
    name: { type: String, unique: true, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    defaultPrice: { type: Number},
    categories: [String],
    created: { type: Date, default: Date.now },
    updated: Date
});

const menuItem = new Schema({
    name: { type: String, unique: false, required: true },
    description: { type: String, required: true },
    notesAndDisclaimers: { type: String, required: false },
    price: { type: String, required: true },
    isAvailable: {type: Boolean, required: true, default: true},
    categories: [String],
    created: { type: Date, default: Date.now },
    updated: Date,
    images: [String],
    includedToppings: [topping],
    availableToppings: [topping]
});

const Category = mongoose.model('Category', category)
const MenuItem = mongoose.model('MenuItem', menuItem)
const Topping = mongoose.model('Topping', topping)

module.exports = {Category, MenuItem, Topping}