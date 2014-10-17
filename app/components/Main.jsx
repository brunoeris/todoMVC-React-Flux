/*jshint node:true, undef:true, unused:true*/

"use strict";

var _ = require("lodash"),
	React = require("react"),

	Evt = require("Constants").Evt,
	Act = require("Constants").Act,

	TodoStore = require("stores/TodoStore"),
	TodoAction = require("actions/TodoAction"),
	Todo = require("components/Todo");

module.exports = React.createClass({
	getInitialState: function () {
		return {
			todos: this.props.todos
		};
	},

	toggleAll: function (e) {
		TodoAction.saveAll(e.currentTarget.checked);
	},

    render: function () {
        return (
        	<section id="main">
                <ul id="todo-list">
                	{_.map(this.state.todos, function (todo) {
                		return (<Todo key={todo.id} todo={todo} />);
                	})}
                </ul>
                <input 
                	type="checkbox" 
                	id="toggle-all" 
                	checked={TodoStore.isAllComplete()}
                	onChange={this.toggleAll} /> 
            </section>
        );
	}
});