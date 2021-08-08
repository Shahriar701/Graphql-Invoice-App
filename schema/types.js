const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql
// const { User, Customer, InvoiceItems } = require("../model")

const User = require("../model/User");
const Customer = require("../model/Customer");
const InvoiceItems = require("../model/InvoiceItem");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
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

module.exports = { UserType, CustomerType, InvoiceItemType, InvoiceType }