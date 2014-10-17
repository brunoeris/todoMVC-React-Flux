/*jshint node:true, undef:true, unused:true*/

"use strict";

module.exports = {
    Act: {
        FILTER: "FILTER_ACTION",
        SAVE: "SAVE_ACTION",
        SAVE_ALL: "SAVE_ALL_ACTION",
        REMOVE: "REMOVE_ACTION",
        REMOVE_ALL: "REMOVE_ALL_ACTION"
    },

    Evt: {
        REQUEST_SENT: "REQUEST_SENT_EVENT",
        REQUEST_SUCCESS: "REQUEST_SUCCESS_EVENT",
        REQUEST_ERROR: "REQUEST_ERROR_EVENT"
    },

    Todo: {
        ALL: "ALL_FILTER",
        ACTIVE: "ACTIVE_FILTER",
        COMPLETED: "COMPLETED_FILTER"
    },

    Src: {
        TODO: "TODO_SOURCE"
    }
};
