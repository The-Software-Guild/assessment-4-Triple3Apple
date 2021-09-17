const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');



const PORT = 5000;


app.use(morgan('dev')); // useful logging info
app.use(express.json(), cors());

// Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.details[0].message) {
        return res.status(err.statusCode).send(error.details[0].message);
    }
    // return res.send.status(err.statusCode).send(error);
    return res.status(err.statusCode).send(error);
});




// Routes

// ....




app.listen(PORT, () => {
    console.log("Server for Assessment4 (Climate Action 101) is running on port: " + PORT);
});