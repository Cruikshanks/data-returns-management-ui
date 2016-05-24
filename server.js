'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var Insert = require('inert');
var Hogan = require('hogan.js');
var Path = require('path');

var config = require('./config/configuration');
var routes = require('./routes');

const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: config.http.port,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

// Register static data server
server.register(Insert, function(err) {
    if (err) {
        console.log('Failed to initialize static server');
        throw err;
    }

    server.route([
        {
            method: 'GET',
            path: '/images/{name}',
            handler: function (request, reply) {
                reply.file('images/' + request.params.name);
            }
        }, {
            method: 'GET',
            path: '/isomorphic/{name*}',
            handler: function (request, reply) {
                reply.file('isomorphic/' + request.params.name);
            }
        }, {
            method: 'GET',
            path: '/script/{name}',
            handler: function (request, reply) {
                reply.file('javascripts/' + request.params.name);
            }
        }, {
            method: 'GET',
            path: '/data/{name}',
            handler: function (request, reply) {
                reply.file('data/' + request.params.name);
            }
        }
    ]);

});

server.register(Vision, function(err) {
    var partialsCache = {};

    if (err) {
        console.error('Failed to initialize views server');
        throw err;
    }

    server.views({
        engines: {
            html: {
                compile: function (template) {
                    var compiledTemplate = Hogan.compile(template);
                    return function (context) {
                        return compiledTemplate.render(context, partialsCache);
                    };
                },
                registerPartial: function (name, template) {
                    partialsCache[name] = template;
                }
            }
        },
        relativeTo: __dirname,
        path: 'views'
    });
});

server.route(routes);


server.start(function (err) {
    if (err) {
        console.log('cannot start server on port: ' + config.http.port);
        throw err;
    } else {
        console.log('server is running on port: ' + config.http.port);
    }
});
