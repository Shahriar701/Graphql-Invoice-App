const { UserType, CustomerType, InvoiceItemType, InvoiceType } = require("./types")
const User = require("../model/User");
const Customer = require("../model/Customer");
const InvoiceItem = require("../model/InvoiceItem");
const Invoice = require("../model/Invoice");
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
const { createJwtToken } = require("../util/auth")


const CreateUser = {
    type: UserType,
    description: "Register new user",
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLNonNull(GraphQLString) },
        department: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { name, age, email, password, department } = args
        const user = new User({ name, age, email, password, department })

        await user.save()
        const token = createJwtToken(user)
        user.token = token
        return user
    },
}

const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select("+password")
        console.log(user)
        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        const token = createJwtToken(user)
        return token
    },
}

const CreateCustomer = {
    type: CustomerType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
    },

    resolve(parent, args, { verifiedUser }) {
        console.log("Verified User: ", verifiedUser)
        if (!verifiedUser) {
            throw new Error("Unauthorized")
        }

        let customer = new Customer({
            name: args.name,
            email: args.email,
            address: args.address,
            userId: args.userId
        });
        //save to our db
        return customer.save();
    }
}

const CreateInvoiceItem = {
    type: InvoiceItemType,
    args: {
        product: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        invoiceId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error("Unauthenticated")
        }

        let invoiceItem = new InvoiceItem({
            product: args.product,
            amount: args.amount,
            price: args.price,
            total: args.amount * args.price,
            invoiceId: args.invoiceId
        });
        return invoiceItem.save();
    }
}

const CreateInvoice = {
    type: InvoiceType,
    args: {
        customerId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args, { verifiedUser }) {
        console.log(verifiedUser)
        if (!verifiedUser) {
            throw new Error("Unauthenticated")
        }
        let invoice = new Invoice({
            timestamp: new Date().toISOString(),
            customerId: args.customerId,
            userId: args.userId,
        });
        return invoice.save();
    }
}

module.exports = {
    login,
    CreateUser,
    CreateCustomer,
    CreateInvoiceItem,
    CreateInvoice
}