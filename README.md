# To run this project
  -> After cloning from root path in cmd run
  -> npm i
  -> npm run start
  -> run node app.js

  # From browser browse to http://localhost:4000/graphql

  # InvoiceItem collection is independent and are grouped by providing related invoiceId to each invoiceItem

  # From docs all queries and mutation structures are available for testing. But few examples are provided below


# login sample to generate token. copy and pass this to header for all mutations endloints
mutation{
  login(email:"israt@email.com", password:"password")
}

# create user sample
mutation{
  CreateUser(name:"some name", email:"someemail@email.com", password:"123456", age:15, department:"sells")
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
  CreateInvoiceItem(product: "some thing", amount: 10, price: 5, invoiceId: "610843112c68d6e7794d43dd"){
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
    id
    timestamp
    user {
      id
      name
      email
    }
    customer {
      id
      name
      email

    }
    invoiceItems {
    id
    product
    price
    amount
    invoiceId
    total
    }
    invoiceTotal
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
