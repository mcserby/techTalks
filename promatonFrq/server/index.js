/*jslint node: true, indent: 2 */
'use strict';
var restify, bunyan, routes, log, server, db;

restify = require('restify');
bunyan  = require('bunyan');
routes  = require('./routes/');
db = require('./common/db/db.js');

server = restify.createServer({
  name : 'server'
});

restify.CORS.ALLOW_HEADERS.push('authorization');

server.use(restify.CORS({
  origins: ['http://localhost:9000'], 
  credentials: true
}));

server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());

/*jslint unparam:true*/
// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, err) {
  console.log('Error!');
  console.log(err);
  res.send(500, { success : false });
});
/*jslint unparam:false*/

//server.on('after', restify.auditLogger({ log: log }));
routes(server);

console.log('Server started.');
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

