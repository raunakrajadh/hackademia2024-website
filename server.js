const express = require('express');
const app = express();
const { server_port } = require('./config.json');

//Server settings
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static('assets'));

//Mongodb Setup
require('./mongodb/connect.js')();

//Routes
app.use('/', require('./routes/_routes.js').app);

let port = process.env.PORT || server_port;
app.listen(port, () => {console.log(`Server: Running at port: ${port}`)});