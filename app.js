const pwd = "add_your_password";
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema')
// const testSchema = require('./schema/types_schema')

const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

// mongodb+srv://shahriar:070420@gq-ecommerce.at5nh.mongodb.net/gq-ecommerce?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://shahriar:007004200@gq-ecommerce.at5nh.mongodb.net/gq-ecommerce?retryWrites=true&w=majority',
{ useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to mogodb');
})

app.use(cors());
 app.use('/graphql', graphqlHTTP({
      graphiql: true,
      schema: schema

 }))

app.listen(port, () => { //localhost:4000
     console.log('LLLLListening for requests on my awesome port 4000');

})
