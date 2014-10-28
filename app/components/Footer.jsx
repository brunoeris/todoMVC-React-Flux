/*jshint node:true, undef:true, unused:true*/

"use strict";

var _ = require("lodash"),
    React = require("react"),
    TodoAction = require("actions/TodoAction"),
    Todo = require("Constants").Todo;

module.exports = React.createClass({

    getInitialState: function () {
        return {
            filter: Todo.ALL
        };
    },

    navigate: function (e) {
      console.log(e.currentTarget.href);
      this.props.routes.setRoute(e.currentTarget.href);
      e.preventDefault();
    },

    render: function () {
          var todos = this.props.todos,
              totalComplete = _.filter(todos, "complete").length,
              totalIncomplete = todos.length - totalComplete;
    
              // hide footer if todos === 0 or null
              if(!todos || todos.length === 0){
                return (<footer></footer>);
              }

        //Clear Completed > 0 --> Show button clear-completed
        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{totalIncomplete}</strong> {todos.length === 1 ? "item left" : "items left"}
                </span>

                <ul id="filters">
                  <li>
                    <a href="/" className="selected" onClick={this.navigate}>All</a>
                  </li>
                  <li>
                    <a href="/active" onClick={this.navigate}>Active</a>
                  </li>
                  <li>
                    <a href="/completed" onClick={this.navigate}>Completed</a>
                  </li>
                </ul>

                {!totalComplete || totalComplete === 0 ? <div></div> : 
                  <button id="clear-completed"
                    onClick={TodoAction.removeAll}>
                    Clear completed ({totalComplete})
                  </button>
                }
            </footer>
        );
    }
    
});