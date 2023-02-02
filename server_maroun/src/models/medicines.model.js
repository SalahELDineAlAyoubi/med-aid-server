const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    dosage:{
        type: String,
        required: true, 
    },
    expDate:{
        type: Date,
        required: true,
    },
    openDate:{
        type: Date,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    }
});

module.exports = mongoose.model('Medicine', medicineSchema);