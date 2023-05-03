const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("DB Connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log("Error in connecting to DB");
    })