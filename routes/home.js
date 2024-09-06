const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    let number = '13254659'
    res.render('home');
});

module.exports = {app};