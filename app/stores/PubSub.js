/*jslint node:true, nomen:true, white:true, todo:true*/
/*global $*/

"use strict";

var merge = require("react/lib/merge"),
    EventEmitter = require("events").EventEmitter,
    PubSub;

PubSub = merge(EventEmitter.prototype, {
    subscribe: function (topic, callback) {
        this.on(topic, callback);
    },

    unsubscribe: function (topic, callback) {
        this.removeListener(topic, callback);
    },

    publish: function () {
        this.emit.apply(this, arguments);
    }
});

PubSub.setMaxListeners(0);

module.exports = PubSub;