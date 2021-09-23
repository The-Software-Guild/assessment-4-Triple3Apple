const express = require('express');
// const morgan = require('morgan');
const dotenv = require('dotenv').config();
// const mongoose = require('mongoose');
const mongooseSetup = require('./utils/mongooseSetup');
// const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
// const { createJwt } = require('./utils/auth');
const { authenticate } = require('./utils/authVerify')
const authRoute = require('./routes/auth');

const DB_NAME = 'assessment_four_db';

const PORT = 5000;

const app = express();

// app.use(morgan('dev')); // useful logging info
// app.use(express.json(), cors());
app.use(express.json());

// DB connection
mongooseSetup.connectToDB(DB_NAME);



// Global Error Handler
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';
//     if (err.details[0].message) {
//         return res.status(err.statusCode).send(error.details[0].message);
//     }

//     return res.status(err.statusCode).send(error);
// });





// Routes
app.use('/auth', authRoute);


// Testing REMOVE THIS
app.get("/", (req, res) => {
    // console.log(req.verifiedUser);
    return res.json('hello world, go to /graphql to interact with GQL (in-browser tool for writing, validating, and # testing GraphQL queries)');
});

// Middleware to authenticate-------------------------------------
app.use(authenticate);

// // Testing
// app.get('/authTest', (req, res) => {
//     return res.json(
//         createJwt({
//             username: 'john',
//             password: '1234',
//             email: 'john@gmail.com'
//         })
//     );
// });


// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true // gives the option to use the graphql interface
// }));

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)

// ....


app.listen(PORT, () => {
    console.log("Server for Assessment4 (Climate Action 101) is running on port: " + PORT);
});