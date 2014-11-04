/*jshint node:true, undef:true, unused:true*/
/*global localStorage*/

"use strict";

var _ = require("lodash"),
Todo = require("Constants").Todo,
    
    // Constants
    Evt = require("Constants").Evt,
    Act = require("Constants").Act,
    Src = require("Constants").Src,

    // Flux
    Dispatcher = require("Dispatcher"),
    PubSub = require("./PubSub"),
    TodoStore = _.extend({}, PubSub),

    // Variáveis privadas
    _todos = JSON.parse(localStorage.getItem("todos")) || [],

    // Métodos privados
    _filter,
    _save,
    _saveAll,
    _removeCompletos,
    _remove;

_filter = function (filter) {

    var todo = _todos,
        totalComplete = _.filter(todo, "complete"),
        totalIncomplete = _.filter(todo, {"complete" : false});
   
    if (filter === Todo.COMPLETED) {
        /*_todos = _.filter(_todos, 'complete');
        localStorage.setItem("todos", JSON.stringify(_todos));
        console.log(_todos);*/
        console.log(totalComplete);
        return totalComplete;
    } else if (filter === Todo.ACTIVE) {
        /*_todos = _.filter(_todos, {'complete' : false});
        localStorage.setItem("todos", JSON.stringify(_todos));
        console.log(_todos);*/
        console.log(totalIncomplete);
        return totalIncomplete;
    } else if (filter === Todo.ALL) {
        /*_todos = _.filter(_todos);
        localStorage.setItem("todos", JSON.stringify(_todos));*/
        console.log(_todos);
        return _todos;
    }
    localStorage.setItem("todos", JSON.stringify(_todos));
    console.log(filter);
};

// Cria ou atualiza um item
_save = function (todo) {
    var item;

    if (!todo.id) {
        todo.id = new Date().toISOString();
        _todos.push(todo);
    } else {
        item = _.find(_todos, {id: todo.id});
        item = todo;
    }

    localStorage.setItem("todos", JSON.stringify(_todos));
};

_saveAll = function (checked) {
    _todos.forEach(function (todo) { 
        todo.complete = checked;
    });

    localStorage.setItem("todos", JSON.stringify(_todos));
};

_remove = function (id) {
    _.remove(_todos, {id: id});
    localStorage.setItem("todos", JSON.stringify(_todos));
};

_removeCompletos = function () {
    _.remove(_todos, {"complete": true});

    localStorage.setItem("todos", JSON.stringify(_todos));
};

TodoStore.getTodos = function () {
    return _todos;
};

TodoStore.isAllComplete = function () {
    // Estudar os métodos da biblioteca lodash
    return _.all(_todos, function (todo) {
        return todo.complete;
    });
};

TodoStore.id = Dispatcher.register(function (payload) {
    if (!payload.source && payload.source != Src.TODO) {
        return;
    }

    switch (payload.action) {
        case Act.FILTER:
            _filter(payload.data);
            TodoStore.publish(Evt.REQUEST_SUCCESS, payload);
            break;

        case Act.SAVE:
            _save(payload.data);
            TodoStore.publish(Evt.REQUEST_SUCCESS, payload);
            break;

        case Act.SAVE_ALL:
            _saveAll(payload.data);
            TodoStore.publish(Evt.REQUEST_SUCCESS, payload);
            break;

        case Act.REMOVE:
            _remove(payload.data);
            TodoStore.publish(Evt.REQUEST_SUCCESS, payload);
            break;

        case Act.REMOVE_ALL:
            _removeCompletos();
            TodoStore.publish(Evt.REQUEST_SUCCESS, payload);
            break;
    }
});

module.exports = TodoStore;