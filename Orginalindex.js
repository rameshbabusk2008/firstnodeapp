const startupdebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');

const express = require('express');
const auth = require('./Auth');
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

app.use(auth);

app.use(helmet());


console.log(`configuration ${config.get('name')}`);

console.log(`configuration ${config.get('mail.host')}`);

console.log(`configuration ${config.get('mail.password')}`);

//console.log(process.env.NODE_ENV);
if ( app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupdebugger('Morgan enabled');
}

dbdebugger('dbconnection connected');

const customers  = [
    {custid:1,custname:'ramesh'},
    {custid:2,custname:'subash'},
    {custid:3,custname:'Rajesh'}
]

app.get("/",(req,res) => {

    //res.send('hello world.. my app!');
    res.render('index',{ title: 'my pug application', message: 'Hello pug...!'} );

});

app.get("/api/customers",(req,res) => {

    res.send(customers);
});

app.get("/api/customer/:id",(req,res) => 
{
     const customer =  customers.find(c=> c.custid === parseInt(req.params.id))
     if(!customer) return res.status(404).send('404 file not found')

     res.send(customer);

});

app.post("/api/customers",(req,res) =>
{
    const { error } =  validateCustomer(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const customer = 
    {
        custid: customers.length + 1,
        custname : req.body.custname
    }


    customers.push(customer);

    res.send(customers);
});


app.put("/api/customer/:id",(req,res) => {
  
    const customer = customers.find(c=> c.custid === parseInt(req.params.id));

    if (!customer) return res.status(404).send('file not found');

  
   const { error } =  validateCustomer(req.body);

   if(error) return res.status(400).send(error.details[0].message);

   customer.custname =  req.body.custname;
 
   res.send(customers);

});

app.delete("/api/customer/:id",(req,res) => {

    const customer = customers.find(c=> c.custid === parseInt(req.params.id));

    if (!customer) return res.status(404).send('file not found');

    const index = customers.indexOf(customer);

    customers.splice(index,1)

    res.send(customers);
});

function validateCustomer(customer)
{
    const schema = 
    {
        custname:Joi.string().min(3).max(50).required()
    };

    return Joi.validate(customer,schema);
}
const port = process.env.PORT || 3000
app.listen(port,() => console.log(`listing to port ${port}`));