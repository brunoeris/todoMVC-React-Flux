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
            todos: TodoStore.getFiltered()
        };
    },

    componentWillMount: function () {
        var routes = {
                "/": function () {
                    TodoAction.filter(Todo.ALL);
                },
                //another syntax
                //"/active": TodoAction.filter.bind(this, Todo.ACTIVE),
                "/active": function () {
                    TodoAction.filter(Todo.ACTIVE);
                },
                "/completed": function () {
                    TodoAction.filter(Todo.COMPLETED);
                }
            };
        
        TodoStore.subscribe(Evt.REQUEST_SUCCESS, this.handleRequestSuccess);

        this.router = new Router(routes)
            .configure({html5history:true})
            .init();
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
                this.setState({todos: TodoStore.getFiltered()});
                break;
        }
    },

    render: function () {
        return (
            <div>
                <section id="todoapp">
                    <Header />
                    <Main todos={this.state.todos}/>
                    <Footer routes={this.router}/>
                </section>

                <footer id="info">
                    <p>Double-click to edit a todo</p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
});