function calculateTotal(invoiceItemsIds) {
    var invoiceTotal = 0;
    var calculateTotal = invoiceItemsIds.forEach(e => {
        return invoiceTotal = invoiceTotal + e.invoiceTotal
    })

    return calculateTotal;
}