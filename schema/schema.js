const graphql = require("graphql");
var _ = require("lodash");
const User = require("../model/User");
const Customer = require("../model/Customer");
const InvoiceItems = require("../model/InvoiceItem");
const Invoice = require("../model/Invoice");
const InvoiceItem = require("../model/InvoiceItem");
const mongoose = require('mongoose');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

//Create types
const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        department: { type: GraphQLString },
    })

});

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    description: "Documentation for Customer...",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
});

const InvoiceItemType = new GraphQLObjectType({
    name: "InvoiceItem",
    description: "invoice item description",
    fields: () => ({
        id: { type: GraphQLID },
        product: { type: GraphQLString },
        price: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        invoiceId: { type: GraphQLString },
        customerId: { type: GraphQLString },
        total: { type: GraphQLInt }
    })
});

const InvoiceType = new GraphQLObjectType({
    name: "Invoice",
    description: "invoice description",
    fields: () => ({
        id: { type: GraphQLID },
        timestamp: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        customer: {
            type: CustomerType,
            resolve(parent, args) {
                return Customer.findById(parent.customerId);
            }
        },
        invoiceItems: {
            type: new GraphQLList(InvoiceItemType),
            resolve(parent, args) {
                return InvoiceItems.find({ invoiceId: parent.id });
            }
        },
        invoiceTotal: {
            type: GraphQLInt,
            resolve(parent, args) {
                return InvoiceItems.find({ invoiceId: parent.id }).exec().then(function (items) {
                    let grandTotal = items.reduce(function (accumulator, item) {
                        return accumulator + item.total;
                    }, 0);
                    return grandTotal;
                });
            }
        }
    })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return User.findById(args.id);
            }
        },

        users: {
            type: UserType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return User.find({});
            }
        },

        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return Customer.findById(args.id);
            }
        },

        customers: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return Customer.findById({});
            }
        },

        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return Invoice.findById(args.id);
            }
        },

        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parent, args) {
                return Invoice.find({ id: args.customerId });
            }
        },

        invoiceItems: {
            type: new GraphQLList(InvoiceItemType),
            resolve(parent, args) {
                return InvoiceItem.find(
                    {
                        id: args.invoiceId
                    }
                );
            }
        },
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                department: { type: GraphQLString }
            },

            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    department: args.department
                });
                //save to our db
                return user.save();
            }
        },

        CreateCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },

            resolve(parent, args) {
                let customer = new Customer({
                    name: args.name,
                    email: args.email,
                    address: args.address,
                    userId: args.userId
                });
                //save to our db
                return customer.save();
            }
        },

        CreateInvoiceItem: {
            type: InvoiceItemType,
            args: {
                product: { type: new GraphQLNonNull(GraphQLString) },
                amount: { type: new GraphQLNonNull(GraphQLInt) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                invoiceId: { type: new GraphQLNonNull(GraphQLString) },
                customerId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {

                let invoiceItem = new InvoiceItem({
                    product: args.product,
                    amount: args.amount,
                    price: args.price,
                    total: args.amount * args.price,
                    invoiceId: args.invoiceId,
                    customerId: args.customerId
                });
                return invoiceItem.save();
            }
        },

        CreateInvoice: {
            type: InvoiceType,
            args: {
                customerId: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let invoice = new Invoice({
                    timestamp: new Date().toISOString(),
                    customerId: args.customerId,
                    userId: args.userId,
                });
                return invoice.save();
            }
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
