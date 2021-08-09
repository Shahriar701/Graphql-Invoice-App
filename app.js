const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { connectDB } = require('./db/index')
const schema = require('./schema/schema')
const { authenticate } = require("./middleware/auth")
const cors = require('cors');
const app = express();
const dotenv = require("dotenv")

dotenv.config();
connectDB()

const port = process.env.PORT;

app.use(cors());

app.use(authenticate)

app.use('/graphql', graphqlHTTP({
     graphiql: true,
     schema: schema
}))

app.listen(port, () => {
     console.log('Listening for requests on port 4000');
})
