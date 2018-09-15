const startupdebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');

const express = require('express');
const auth = require('./Auth');
const customer = require('./routes/customer');
const home = require('./routes/home');

const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

const app = express();

app.set('view engine','pug');

app.set('views','./views') //defalut

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(function(req,res,next) {

    console.log('logging..!');
    next();

});

app.use('/api/customer',customer);
app.use('/',home);

app.use(auth);

app.use(helmet());


console.log(`configuration ${config.get('name')}`);

console.log(`configuration ${config.get('mail.host')}`);

//console.log(`configuration ${config.get('mail.password')}`);

//console.log(process.env.NODE_ENV);
if ( app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupdebugger('Morgan enabled');
}

dbdebugger('dbconnection connected');


const port = process.env.PORT || 3000
app.listen(port,() => console.log(`listing to port ${port}`));