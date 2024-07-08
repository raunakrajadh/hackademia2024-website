const express = require('express');
const app = express.Router();
const fs = require('fs');

app.use('/', require('./home').app)

const routes = fs.readdirSync('./routes').filter(file => 
    file.endsWith('.js') && 
    file !== __filename.slice(__dirname.length + 1)
);

app.get('/:routeName', (req, res, next) => {
    if(!routes.find(route => route.slice(0, route.length-3) == req.params.routeName)){
        res.render('not_found', {routes, route: req.params.routeName})
    }
    else next();
})

for(const route of routes){
    const _route = require(`../routes/${route}`);
    let routeName = route.slice(0, route.length-3);
    if(_route.app){
        app.use(`/${routeName}`, _route.app);
    }
};

module.exports = {app};