/*jshint node:true, undef:true, unused:true, newcap:false*/

"use strict";

var _ = require("lodash"),
	React = require("react"),
	TodoStore = require("stores/TodoStore"),
	TodoAction = require("actions/TodoAction"),
	Todo = require("components/Todo");

module.exports = React.createClass({
	toggleAll: function (e) {
		TodoAction.saveAll(e.currentTarget.checked);
	},

    render: function () {
    	var todos = this.props.todos;

    	//hide and show checkboxALL
    	if(!todos || todos.length === 0){
            return (<div></div>);
        }

        return (
        	<section id="main">
                <ul id="todo-list">
                	{_.map(todos, function (todo) {
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