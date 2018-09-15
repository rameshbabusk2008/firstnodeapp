const http = require('http');

const courses =  [
    {id:1,name:'courses1'},
    {id:2,name:'courses1'},
    {id:3,name:'courses1'}

];
const server = http.createServer(function(req,res)
{
     if (req.url === "/")
     {
         res.write('hello world..!');
         res.end();
     }

     if(req.url === "/api/courses")
     {
         res.write(JSON.stringify(courses));
         res.end();
     }

  
}
);

const port = process.env.PORT || 3000;

server.listen(port,() => console.log(`listing to port ${port}`));
