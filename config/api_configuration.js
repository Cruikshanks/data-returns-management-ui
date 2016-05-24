'use strict';

var config = {};
module.exports = config;

config.http = {
    protocol: 'http',
    server: '0.0.0.0',
    path: 'data-returns-management-service/api',
    port: 9000,
    url_all: function(list) {
        return this.protocol + '://' + this.server + ':' + this.port + '/' + this.path + '/' + list + '/all';
    }
}

config.lists = {
    units: { name: 'Units', path: 'units'},
    rtntype: { name: 'Return Type', path: 'rtntype'},
    refperiod: { name: 'Ref-period', path: 'refperiod'},
    parameter: { name: 'Parameters', path: 'parameter'}
}

