var api_client = require('../api/api_client');

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

    listDataHandler: function(request, reply) {
        api_client.getListData(request.params.listname).then(function successHandler(result) {
             reply(result).code(200);
        }, function failureHandler(error) {
             reply(error).code(500);
        });
    },

    listDataHandler2: function(request, reply) {
        try {
            if (!request.query.list) {
                throw new Error("No request query");
            } else {
                var queryObject = JSON.parse(request.query.list);
                api_client.getListData(queryObject.name).then(function successHandler(result) {
                    console.log("Fetch: " + queryObject.name);
                    reply(result).code(200);
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