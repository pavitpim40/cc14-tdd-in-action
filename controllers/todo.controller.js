const { Todo } = require('../models/');
const TodoService = require('../services/todo.services');

exports.createTodo = async (req, res, next) => {
    try {
        const newTodo = req.body;
        const result = await TodoService.createTodo(newTodo);

        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;

        const newTodo = await TodoService.getTodoById(todoId);

        if (!newTodo) {
            return res.status(404).send();
        }

        return res.status(200).json(newTodo);
    } catch (err) {
        next(err);
    }
};
