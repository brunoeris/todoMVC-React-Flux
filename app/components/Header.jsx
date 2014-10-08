var React = require("react"),
 	TodoAction = require("actions/TodoAction");

module.exports = React.createClass({
	addTodo: function (e) {
		var title = e.currentTarget.value.trim();

		if (e.key == "Enter" && title) {
			TodoAction.save({
				title: title,
				complete: false
			});

			e.currentTarget.value = "";
		}
	},

    render: function () {
        return (
 			<header id="header">
                <h1>todos</h1>
                <input id="new-todo" 
                	type="text" 
                	placeholder="What needs to be done?"
                	onKeyDown={this.addTodo} />
            </header>
        ); 
    }
});