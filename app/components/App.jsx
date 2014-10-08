var React = require("react"),
    Header = require("./Header"),
    Main = require("./Main"),
    TodoStore = require("stores/TodoStore"),
    Evt = require("Constants").Evt,
    Act = require("Constants").Act,
    Footer = require("./Footer"),
    TodoAction = require("actions/TodoAction");

module.exports = React.createClass({

    getInitialState: function () {
        return {
            todos: TodoStore.getTodos()
        };
    },
    componentWillMount: function () {
        TodoStore.subscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
    },

    componentWillUnmount: function () {
        TodoStore.unsubscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
    },

    handleRequestSuccess: function (payload) {
        switch (payload.action) {
            case Act.SAVE:
            case Act.SAVE_ALL:
            case Act.REMOVE:
            case Act.REMOVE_ALL:
                this.setState({todos: TodoStore.getTodos()});
                break;
        }
    },

    render: function () {
        return (
            <section id="todoapp">
                <Header />
                <Main todos = {this.state.todos}/>
                <Footer todos = {this.state.todos}/>
            </section>
        );
    }
});