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
  CreateCustomer(name: "tasnuva zaman",email: "tasnuva@gmail.com", address: "awsedrft", userId: "610cf27153ee222e0031fd8a"){
    name
    email
    address
    user {
      name
      age
      department
    }
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

# create invoice sample
mutation{
  CreateInvoice(customerId: "610cf3d153ee222e0031fd94", userId: "610cf27153ee222e0031fd8a"){
      timestamp
      user
      customer
  }
}

# create invoice Item sample
mutation{
  CreateInvoiceItem(product: "pen", amount: 10, price: 50, invoiceId: "610cfab8e44d431f2025e3bd", customerId: "610cf3d153ee222e0031fd94"){
        product
        amount
        price
        total
        invoiceId
        customerId
  }
}

# get invoice
{
  invoice(id:"invoiceid"){
    id
    timestamp
    user {
      name
      age
    }
    customer {
      name
      email
      address
    }
    invoiceItems {
      product
      price
      amount
      invoiceId
      customerId
      total
    }
    invoiceTotal
  }
}

# get invoices
{
  invoices{
    id
    timestamp
    user {
      name
      age
    }
    customer {
      name
      email
      address
    }
    invoiceItems {
      product
      price
      amount
      invoiceId
      customerId
      total
    }
    invoiceTotal
  }
}