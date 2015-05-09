
//
// Just set up your options...
//
var router = {
    'localmovielala.com': 'http://127.0.0.1:3000',
    'api.localmovielala.com': 'http://127.0.0.1:4000',
    'embed.localmovielala.com': 'http://127.0.0.1:5000',
    'embedadmin.localmovielala.com': 'http://127.0.0.1:5001',
    'movielala.com': 'http://127.0.0.1:3000',
    'api.movielala.com': 'http://127.0.0.1:4000',
    'embed.movielala.com': 'http://127.0.0.1:5000',
    'embedadmin.movielala.com': 'http://127.0.0.1:5001'
};

//
// ...and then pass them in when you create your proxy.
//
var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    console.log(router[req.headers.host]);

    options = { target: 'http://127.0.0.1:5000' };

    proxy.web(req, res, options);
});

console.log("listening on port 80")
server.listen(80);
