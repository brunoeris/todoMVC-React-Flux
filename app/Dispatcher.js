/*jslint node:true, nomen:true, white:true*/

"use strict";

var invariant = require("react/lib/invariant"),
    merge = require("react/lib/merge"),

    _lastID = 1,
    _prefix = "STORE_";

function Dispatcher() {
    this._callbacks = {};
    this._isPending = {};
    this._isHandled = {};
    this._isDispatching = false;
    this._pendingPayload = null;
}

Dispatcher.prototype = merge(Dispatcher.prototype, {
    /**
     * Registers a callback to be invoked with every dispatched payload.
     * Returns a token that can be used with `waitFor()`.
     *
     * @param {function} callback
     * @return {string}
     */
    register: function (callback) {
        var id = _prefix + _lastID++;
        this._callbacks[id] = callback;
        return id;
    },

    /**
     * Removes a callback based on its token.
     *
     * @param {string} id
     */
    unregister: function (id) {
        invariant(
            this._callbacks[id],
            "Dispatcher.unregister(...): `%s` does not map " +
            "to a registered callback.",
            id
        );

        delete this._callbacks[id];
    },

    /**
     * Waits for the callbacks specified to be invoked before continuing
     * execution of the current callback. This method should only be used
     * by a callback in response to a dispatched payload.
     *
     * @param {array<string>} ids
     */
    waitFor: function (ids) {
        var i, id;

        invariant(
            this._isDispatching,
            "Dispatcher.waitFor(...): Must be invoked while dispatching."
        );

        for (i = 0; i < ids.length; i++) {
            id = ids[i];

            if (this._isPending[id]) {
                invariant(
                    this._isHandled[id],
                    "Dispatcher.waitFor(...): Circular dependency " +
                    "detected while waiting for `%s`.",
                    id
                );

                continue;
            }

            invariant(
                this._callbacks[id],
                "Dispatcher.waitFor(...): `%s` does not map " +
                "to a registered callback.",
                id
            );

            this._invokeCallback(id);
        }
    },

    /**
     * Dispatches a payload to all registered callbacks.
     *
     * @param {object} payload
     */
    dispatch: function (payload) {
        var id;

        invariant(
            !this._isDispatching,
            "Dispatch.dispatch(...): Cannot dispatch " +
            "in the middle of a dispatch."
        );

        this._startDispatching(payload);

        try {
            for (id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }

                this._invokeCallback(id);
            }
        } finally {
            this._stopDispatching();
        }
    },

    /**
     * Is this Dispatcher currently dispatching.
     *
     * @return {boolean}
     */
    isDispatching: function () {
        return this._isDispatching;
    },

    /**
     * Call the calback stored with the given id.
     * Also do some internal bookkeeping.
     *
     * @param {string} id
     * @internal
     */
    _invokeCallback: function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    },

    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @param {object} payload
     * @internal
     */
    _startDispatching: function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }

        this._pendingPayload = payload;
        this._isDispatching = true;
    },

    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    _stopDispatching: function () {
        this._pendingPayload = null;
        this._isDispatching = false;
    }
});

module.exports = new Dispatcher();