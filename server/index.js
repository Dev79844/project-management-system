const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
// app.use(morgan('tiny'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}))

mongoose.connect('mongodb://mongo-service/db')
    .then(() => {
        console.log("DB Connected");
        app.listen(5000, () => {
            console.log(`Server running on 5000`);
        })
    })
    .catch(err => {
        console.log("Error in connecting to DB");
    })