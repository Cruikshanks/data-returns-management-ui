'use strict';

var handlers = require('./routes/handlers');

module.exports = [
    {
        method: '*',
        path: '/',
        handler: handlers.defaultHandler
    },
    {
        method: 'get',
        path: '/lists',
        handler: handlers.listHandler
    },
    {
        method: 'get',
        path: '/lists/fetch',
        handler: handlers.fetchHandler
    },
];