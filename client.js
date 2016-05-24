'use strict';

var api_client = require('./api/api_client');

api_client.getListData('parameter').then(function successHandler(result) {
    console.log(result);
}, function failureHandler(error) {
    console.log(error);
});

