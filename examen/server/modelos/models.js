const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    numbers: {
        type: Array,
    },
    quantity: {
        type: Number
    },
    avrg: {
        type: Number
    },
    maximun: {
        type: Number
    },
    min: {
        type: Number
    }


});

module.exports = mongoose.model('Usuario', usuarioSchema);