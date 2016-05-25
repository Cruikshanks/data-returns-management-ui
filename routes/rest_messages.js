'use strict';

module.exports = {};

module.exports.FetchResponse =
    function FetchResponse(data, startRow, endRow, totalRows, status) {
        this.status = status;
        this.startRow = startRow;
        this.endRow = endRow;
        this.totalRows = totalRows;
        this.data = data;
        this.getMessage = function () {
            return ({
                response: {
                    status: this.status || 0,
                    startRow: this.startRow || 0,
                    endRow: this.endRow || data.length,
                    totalRows: this.totalRows || data.length,
                    data: this.data || []
                }
            });
        }
    };
