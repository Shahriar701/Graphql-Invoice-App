# create user sample
mutation{
  CreateUser(name:"Israt tasmia",age:55, department:"sells"){
    name
    age
    department
  }
}

# create customer sample
mutation{
  CreateCustomer(name: "tasnuva zaman",email: "shahriar701@gmail.com", address: "awsedrft", userId: "61083e6a2c68d6e7794d43d1"){
    name
    email
    address
    userId
  }
}

# create invoice Item sample
mutation{
  CreateInvoiceItem(product: "gaming stick", amount: 10, price: 5, invoiceId: "610843112c68d6e7794d43dd"){
    product
    price
    amount
    invoiceId
    total
  }
}