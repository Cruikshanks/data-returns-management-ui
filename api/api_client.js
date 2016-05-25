'use strict';

var api = require('../config/api_configuration');
var Request = require('request');

module.exports.getListData = function(list) {
    return new Promise(function (resolve, reject) {
        if (api.lists[list] === undefined) {
            reject({
                isUserError: true,

                message: 'Unknown list: ' + list
            });
        } else {

            var apiData = {
                url: api.http.url_all(list),
                headers: {}
            };

            Request.get(apiData, function (err, httpResponse) {
                if (!httpResponse) {
                    reject({
                        isUserError: true,
                        message: 'No response'
                    });
                } else if (err) {
                    reject({
                        isUserError: true,
                        message: 'Request Error',
                        messageDetail: err.message
                    });                    
                } else {
                    if (httpResponse.statusCode != 200) {
                        reject({
                            isUserError: true,
                            message: 'Request Error: ' + httpResponse.statusCode,
                            messageDetail: httpResponse.statusMessage
                        });
                    } else {
                        try {
                            var parsedJson = JSON.parse(httpResponse.body);
                            // Return the result as an array
                            resolve(parsedJson);
                        } catch (err) {
                            reject({
                                isUserError: true,
                                message: 'Invalid JSON Response: ',
                                messageDetail: err.message
                            });
                        }
                    }
                }
            });
        }
    });
};

