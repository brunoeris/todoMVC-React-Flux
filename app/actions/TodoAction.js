/*jshint node:true, undef:true, unused:true*/

"use strict";

var Dispatcher = require("Dispatcher"),

	Src = require("Constants").Src,
	Act = require("Constants").Act;

module.exports = {

	/**
	 * Método para adicionar um novo todo ou atualizar um existente.
	 */

	filter: function (filter) {
		Dispatcher.dispatch({
			action: Act.FILTER,
			source: Src.TODO,
			data: filter
		});
	},

	save: function (todo) {
		Dispatcher.dispatch({
			action: Act.SAVE,
			source: Src.TODO,
			data: todo
		});
	},

	saveAll: function (checked) {
		Dispatcher.dispatch({
			action: Act.SAVE_ALL,
			source: Src.TODO,
			data: checked
		});
	},

	remove: function (id) {
		Dispatcher.dispatch({
			action: Act.REMOVE,
			source: Src.TODO,
			data: id
		});
	},
	
	removeAll: function(){
		Dispatcher.dispatch({
			action: Act.REMOVE_ALL,
			source: Src.TODO
		});
	}

};