const mongoose = require('mongoose');
const MSchema = mongoose.Schema;


const invoiceItemSchema = new MSchema({
    id: String,
    timestamp: String,
    invoiceTotal: Number,
    user: String,
    customer: String
})
module.exports = mongoose.model('invoice', invoiceItemSchema);