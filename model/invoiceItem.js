const mongoose = require('mongoose');
const MSchema = mongoose.Schema;


const invoiceItemsSchema = new MSchema({
    product: String,
    price: Number,
    amount: Number,
    total: Number,
    invoiceId: String,
    customerId: String
})
module.exports = mongoose.model('InvoiceItems', invoiceItemsSchema);