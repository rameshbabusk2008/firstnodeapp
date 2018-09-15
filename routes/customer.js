
const express = require('express');
const router = express.Router();


const customers  = [
    {custid:1,custname:'ramesh'},
    {custid:2,custname:'subash'},
    {custid:3,custname:'Rajesh'}
]


router.get("/",(req,res) => {

    res.send(customers);
});

router.get("/:id",(req,res) => 
{
     const customer =  customers.find(c=> c.custid === parseInt(req.params.id))
     if(!customer) return res.status(404).send('404 file not found')

     res.send(customer);

});

router.post("/",(req,res) =>
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


router.put("/:id",(req,res) => {
  
    const customer = customers.find(c=> c.custid === parseInt(req.params.id));

    if (!customer) return res.status(404).send('file not found');

  
   const { error } =  validateCustomer(req.body);

   if(error) return res.status(400).send(error.details[0].message);

   customer.custname =  req.body.custname;
 
   res.send(customers);

});

router.delete("/:id",(req,res) => {

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

module.exports = router;