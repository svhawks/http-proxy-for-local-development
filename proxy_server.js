var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var httpProxy = require('http-proxy');
var _ = require('lodash');

/*
  Configuration
*/

// Default target that the proxy will forward requests to
var defaultTarget = {
  host: '127.0.0.1',
  port: 3000
};

// If the request host matches one of these, the request will be forwarded to the specified target
// You can also override the host like: {host: '192.168.0.28', port: 80}
var customTargets = {
  'localmovielala.com':               {port: 3000},
  'api.localmovielala.com':           {port: 4000},
  'embed.localmovielala.com':         {port: 5000},
  'embedadmin.localmovielala.com':    {port: 5001},
  'movielala.com':                    {port: 3000},
  'api.movielala.com':                {port: 4000},
  'embed.movielala.com':              {port: 5000},
  'embedadmin.movielala.com':         {port: 5001}
};

// SSL key and certificates for HTTPS
var httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './localmovielala.com.key'), 'utf-8'),
  cert: fs.readFileSync(path.resolve(__dirname, './localmovielala.com.cert'), 'utf-8')
};

/*
  Helpers
*/

var requestListener = function requestListener(req, res) {
  
  var target = _.assign({},
    defaultTarget,
    customTargets[req.headers.host] || {}
  );

  proxyServer.web(req, res, {
    target: target
  });

}

var onError = function onError(source, err) {

  console.log('Error in "' + source + '"');
  console.log(err);

};

var onListening = function onListening(source) {

  console.log('"' + source + '" is listening...');

};

/*
  Proxy Server
*/

var proxyServer = httpProxy.createProxyServer({})
  .on('error', _.bind(onError, null, 'proxy'));

/*
  HTTPS Server
*/

https.createServer(httpsOptions, requestListener)
  .on('listening', _.bind(onListening, null, 'https'))
  .on('error', _.bind(onError, null, 'https'))
  .listen(443);

/*
  HTTP Server
*/

http.createServer(requestListener)
  .on('listening', _.bind(onListening, null, 'http'))
  .on('error', _.bind(onError, null, 'http'))
  .listen(443);
