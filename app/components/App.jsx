/*jshint node:true,  undef:true, unused:true, newcap:false*/

"use strict";

var React = require("react"),
    Header = require("./Header"),
    Main = require("./Main"),
    TodoStore = require("stores/TodoStore"),
    TodoAction = require("actions/TodoAction"),
    Evt = require("Constants").Evt,
    Todo = require("Constants").Todo,
    Act = require("Constants").Act,
    Footer = require("./Footer"),
    Router = require("director").Router;

module.exports = React.createClass({

    getInitialState: function () {
        return {
            todos: TodoStore.getTodos()
        };
    },

    componentWillMount: function () {
         var routes = {
                '/': function () {
                    TodoAction.filter(Todo.ALL);
                    console.log("ALL");
                },
                //djalma's crazy syntax
                //'/active': TodoAction.filter.bind(this, Todo.ACTIVE),
                '/active': function () {
                    TodoAction.filter(Todo.ACTIVE);
                    console.log("ACTIVE");
                },
                '/completed': function () {
                    TodoAction.filter(Todo.COMPLETED);
                    console.log("COMPLETED");
                }
              };

        var router = Router(routes);
        
        router.configure({html5history:true}).init();

        TodoStore.subscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
    },

    componentWillUnmount: function () {
        TodoStore.unsubscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);
    },

    handleRequestSuccess: function (payload) {
        switch (payload.action) {
            case Act.FILTER:
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
            <div>
                <section id="todoapp">
                    <Header />
                    <Main todos = {this.state.todos}/>
                    <Footer todos = {this.state.todos} routes={this.router}/>
                </section>

                <footer id="info">
                    <p>Double-click to edit a todo</p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
});