const mongoose = require('mongoose');
const MSchema = mongoose.Schema;


const invoiceSchema = new MSchema({
    timestamp: String,
    userId: String,
    customerId: String
})
module.exports = mongoose.model('Invoice', invoiceSchema);