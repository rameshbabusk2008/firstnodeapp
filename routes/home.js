
const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {

    //res.send('hello world.. my app!');
    res.render('index',{ title: 'my pug application', message: 'Hello pug...!'} );

});


module.exports = router;