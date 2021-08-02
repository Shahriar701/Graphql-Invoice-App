const graphql = require("graphql");
var _ = require("lodash");
const User = require("../model/user");
const Customer = require("../model/customer");
const InvoiceItems = require("../model/invoiceItem");
const Invoice = require("../model/invoice");
const { calculateTotal } = require("../mapper/calculateTotal");

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
    description: "Documentation for cunstomker...",
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

// {id: "1", timestamp: "2021-08-01T11:00:00+00:00", customerId: "2", userId:"2",
// invoiceItemsIds:[invoiceItemsId:"2"], invoiceTotal: 70000},
const InvoiceType = new GraphQLObjectType({
    name: "Invoice",
    description: "invoice description",
    fields: () => ({
        id: { type: GraphQLID },
        timestamp: {type: GraphQLString},
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
            type: {type: GraphQLInt},
            resolve(parent, args) {
                return calculateTotal(this.invoiceItems);
            }
        },
    })
});



//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return invoice.findById(args.id);
            }
        },

        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parent, args) {
                return invoice.find(
                    {
                        id: args.customerId
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
                email: { type: new GraphQLNonNull(GraphQLInt) },
                address: { type: GraphQLString },
                userId: { type: GraphQLString }
            },

            resolve(parent, args) {
                let customer = new User({
                    email: args.email,
                    age: args.age,
                    address: args.address,
                    userId: args.userId
                });
                //save to our db
                return user.save();

            }
        },

        CreateInvoiceItem: {
            type: InvoiceItemType,
            args: {
                product: { type: new GraphQLNonNull(GraphQLString) },
                amount: { type: new GraphQLNonNull(GraphQLInt) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                total: { type: new GraphQLNonNull(GraphQLInt) },
                invoiceId: { type: new GraphQLNonNull(GraphQLString) },
                customerId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let invoiceItem = new Hobby({
                    product: args.product,
                    amount: args.amount,
                    price: args.price,
                    total: args.price * args.amount,
                    invoiceId: args.invoiceId,
                    customerId: args.customerId
                });

                return invoiceItem.save();

            }
        },

        CreateInvoice: {
            type: InvoiceType,
            args: {
                timestamp: { type: new GraphQLNonNull(GraphQLString) },
                customerId: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let invoice = new Hobby({
                    timestamp: Date.now(),
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
