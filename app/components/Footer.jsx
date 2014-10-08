var _ = require("lodash"),
    React = require("react"),
    TodoStore = require("stores/TodoStore"),
    TodoAction = require("actions/TodoAction");

module.exports = React.createClass({

    render: function () {
        var todos = this.props.todos,
            totalComplete = _.filter(todos, "complete").length,
            totalIncomplete = todos.length - totalComplete;


        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{totalIncomplete}</strong> todos restante
                </span>

                <ul id="filters"> 
                  <li>
                    <a href="all" className="selected">All</a>
                  </li>
                  <li>
                    <a href="active">Active</a>
                  </li>
                  <li>
                    <a href="completed">Completed</a>
                  </li>
                </ul>

                <button id="clear-completed"
                    onClick={TodoAction.removeAll}>
                  Clear completed ({totalComplete})
                </button>
            </footer>
        );
    }
    
});