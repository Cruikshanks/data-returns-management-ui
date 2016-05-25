'use strict';

var api_client = require('../api/api_client');
var messages = require('./rest_messages');

module.exports = {

    defaultHandler: function(request, reply) {
        reply.view(
            'default',
            {
                data: 'Controlled Lists Administration'
            }
        );
    },

    listHandler: function(request, reply) {
        reply.view(
            'lists',
            {
                data: 'main page'
            }
        );
    },
    
    fetchHandler: function(request, reply) {
        try {
            if (!request.query.list) {
                throw new Error("No request query");
            } else {
                var queryObject = JSON.parse(request.query.list);
                api_client.getListData(queryObject.name).then(function successHandler(result) {
                    console.log("Fetch: " + queryObject.name);
                    var response = new messages.FetchResponse(result).getMessage();
                    reply(response).code(200);
                }, function failureHandler(error) {
                    reply(error).code(500);
                });
            }
        } catch (err) {
            console.log(err);
            reply(new Error("Invalid Request")).code(400);
        }
    }
};