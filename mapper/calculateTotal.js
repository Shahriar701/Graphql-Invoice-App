var calculateTotal = (invoiceItems) => {
    console.log(invoiceItems);
    var calculateTotal = invoiceItems.forEach(e => {
        console.log(invoiceItems);
        return invoiceTotal = invoiceTotal + e.total
    })
    return calculateTotal;
}

module.exports = { calculateTotal }