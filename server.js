const express = require('express');
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const favicon = require('serve-favicon');
const app = express();

var PORT = 80;
app.use(compression());
app.use(express.static(`${__dirname}/client/dist`));

/*
  Table: (Endpoints in table)  
    first:   Tim 
    second:  Matt 
    third:   Trang
    fourth:  Julian 
*/

var table = {
  '/api/product/': 'http://ec2-13-59-168-212.us-east-2.compute.amazonaws.com/',
  '/api/productreview/': 'http://ec2-54-153-76-121.us-west-1.compute.amazonaws.com/',
  '/api/products/': 'http://ec2-18-144-10-251.us-west-1.compute.amazonaws.com/',
  '/products/': 'http://ec2-52-53-247-104.us-west-1.compute.amazonaws.com/'
}

var options = {
  target: 'http://ec2-18-223-101-10.us-east-2.compute.amazonaws.com/',
  router: table,
}
var myProxy = proxy(options);
app.use(myProxy);

app.listen(PORT, console.log(`listening at ${PORT}`));