const { GraphQLList, GraphQLID } = require("graphql")
const { UserType, CustomerType, InvoiceItemType, InvoiceType } = require("./types")
const User = require("../model/User");
const Customer = require("../model/Customer");
const InvoiceItem = require("../model/InvoiceItem");
const Invoice = require("../model/Invoice");

const user = {
    type: UserType,
    args: { id: { type: GraphQLID } },

    resolve(parent, args, { verifiedUser }) {
        return User.findById(args.id);
    }
}

const users = {
    type: UserType,
    args: { id: { type: GraphQLID } },

    resolve(parent, args) {
        return User.find({});
    }
}

const customer = {
    type: CustomerType,
    args: { id: { type: GraphQLID } },

    resolve(parent, args) {
        return Customer.findById(args.id);
    }
}

const customers = {
    type: CustomerType,
    args: { id: { type: GraphQLID } },

    resolve(parent, args) {
        return Customer.findById({});
    }
}
const invoice = {
    type: InvoiceType,
    args: { id: { type: GraphQLID } },

    resolve(parent, args) {
        return Invoice.findById(args.id);
    }
}

const invoices = {
    type: new GraphQLList(InvoiceType),
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Invoice.find({ id: args.customerId });
    }
}

const invoiceItems = {
    type: new GraphQLList(InvoiceItemType),
    resolve(parent, args) {
        return InvoiceItem.find(
            {
                id: args.invoiceId
            }
        );
    }
}

module.exports = { users, user, customer, customers, invoice, invoices, invoiceItems }