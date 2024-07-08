module.exports = () => {
    const mongoose = require('mongoose');
    const { mongodb_uri } = require('../config.json')

    mongoose.connect(mongodb_uri)
    .then(() => {
        console.log(`Mongodb: Connected to database.`);
    })
    .catch((error) => {
        console.log(`Mongodb: Error connecting to database.`, error);
    })
}