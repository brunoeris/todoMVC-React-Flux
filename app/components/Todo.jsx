var React = require("react/addons"),

	Evt = require("Constants").Evt,
	Act = require("Constants").Act,

	TodoStore = require("stores/TodoStore"),
	TodoAction = require("actions/TodoAction"),
	Footer = require("components/Footer");

module.exports = React.createClass({
	getInitialState: function () {
		return {
			isEditing: false
		};
	},

	componentWillMount: function () {
		TodoStore.subscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
	},

	componentWillUnmount: function () {
		TodoStore.unsubscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
	},

	handleRequestSuccess: function (payload) {
		if (payload.action == Act.SAVE && payload.data.id == this.props.todo.id) {
			this.setState({isEditing: false});
		}
	},

	toggleEdit: function () {
		this.setState({isEditing: !this.state.isEditing});
	},

	toggle: function (e) {
		var todo = this.props.todo;
		todo.complete = e.currentTarget.checked;
		TodoAction.save(todo);
	},

	remove: function (e) {
		TodoAction.remove(this.props.todo.id);
	},

	save: function (e) {
		var title = e.currentTarget.value.trim(),
			todo = this.props.todo;

		if (e.key == "Enter" && title) {
			todo.title = title;
			TodoAction.save(todo);
		}
	},
	remove_all: function(e){
		TodoAction.removeAll(Footer.contarCompletos);
	},

	
    render: function () {
    	var todo = this.props.todo;

		return (
          	<li onDoubleClick={this.toggleEdit}
          		className={React.addons.classSet({
	          		"completed": todo.complete,
	          		"editing": this.state.isEditing
	          	})}>

                <input 
                	type="checkbox" 
                	checked={todo.complete}
                	className={this.state.isEditing ? "hidden" : "toggle"} 
                	onChange={this.toggle} />
                
                {this.state.isEditing ?
                	<input
                		autoFocus = {true}
                		onBlur={this.toggleEdit}
                		onKeyDown={this.save}
                		type="text" 
                		className="edit" 
                		defaultValue={todo.title} /> :
                	<label>{todo.title}</label>
                }

                <button onClick={this.remove}
                	className={this.state.isEditing ? "hidden" : "destroy"}>
                </button>
          	</li>
		);
	}
});