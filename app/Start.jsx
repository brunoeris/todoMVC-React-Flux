/*jshint node:true, undef:true, unused:true, newcap:false*/
/*global document*/
"use strict";

var React = require("react"),
	App = require("components/App");

module.exports = React.renderComponent(<App />, document.body);