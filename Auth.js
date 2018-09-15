function auth(req,res,next)
{
    console.log('Authetication..!');
    next();
}

module.exports = auth;