const pwd = "007004200";
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema')
const { authenticate } = require("./middleware/auth")
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
const dotenv = require("dotenv")

mongoose.connect('mongodb+srv://shahriar:' + pwd + '@gq-ecommerce.at5nh.mongodb.net/gq-ecommerce?retryWrites=true&w=majority',
     { useNewUrlParser: true })

mongoose.connection.once('open', () => {
     console.log('connected to mogodb');
})

app.use(cors());
dotenv.config();

app.use('/graphql', graphqlHTTP({
     graphiql: true,
     schema: schema

}))

app.listen(port, () => {
     console.log('LLLLListening for requests on my awesome port 4000');
})
