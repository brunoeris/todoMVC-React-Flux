var _ = require("lodash"),
    React = require("react"),
    TodoStore = require("stores/TodoStore"),
    TodoAction = require("actions/TodoAction");

module.exports = React.createClass({

    componentDidMount: function (e) {
      document.querySelector('footer').style.visibility="hidden";
    },

    render: function () {
          var todos = this.props.todos,
              totalComplete = _.filter(todos, "complete").length,
              totalIncomplete = todos.length - totalComplete,
              getFooter = document.querySelector('footer');
    
              if(todos == null || todos.length == 0){
                  if (getFooter == null) {
                      console.log(todos);
                  } else {
                      document.querySelector('footer').style.visibility="hidden";
                    }
              } else {
                  document.querySelector('footer').style.visibility="visible";
                };

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