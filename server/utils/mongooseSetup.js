const mongoose = require('mongoose');

// Connect to MongoDB database via mongoose
const connectToDB = (dbName) => {

    mongoose.connect('mongodb://127.0.0.1:27017/' + dbName, { useNewUrlParser: true }).then(() => {
        console.log('Connection Successful');
    }).catch((error) => {
        console.log('something went wrong', error);
    });

    const connection = mongoose.connection;

    connection.once('open', function () {
        console.log(`MongoDB database connection to '${dbName}' db established successfully`);
    });

}

module.exports = { connectToDB };
