const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const customerSchema = new MSchema({
    name: String,
    email: Number,
    address: String,
    userId: String
})

module.exports = mongoose.model('Customer', customerSchema);