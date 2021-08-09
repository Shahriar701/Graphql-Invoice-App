const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const pwd = process.env.MONGO_PWD;

const connectDB = async () => {
    mongoose.connect('mongodb+srv://shahriar:' + pwd + '@gq-ecommerce.at5nh.mongodb.net/gq-ecommerce?retryWrites=true&w=majority',
        { useNewUrlParser: true })

    mongoose.connection.once('open', () => {
        console.log('connected to mogodb');
    })
}

module.exports = { connectDB }
