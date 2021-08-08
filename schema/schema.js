const graphql = require("graphql");

// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")

// Import queries
const {
    user,
    users,
    invoices,
    invoiceItems,
    invoice,
    customers,
    customer
} = require("./queries")

// Import mutations
const {
    login,
    CreateUser,
    CreateCustomer,
    CreateInvoiceItem,
    CreateInvoice
} = require("./mutations")

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Queries',
    fields: {
        user,
        users,
        customer,
        customers,
        invoice,
        invoices,
        invoiceItems,
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        login,
        CreateUser,
        CreateCustomer,
        CreateInvoiceItem,
        CreateInvoice
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})