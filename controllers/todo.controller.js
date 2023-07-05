const { Todo } = require('../models/');
const TodoService = require('../services/todo.services');

exports.createTodo = async (req, res, next) => {
    try {
        const newTodo = req.body;

        const result = await TodoService.createTodo(newTodo);

        return res.status(201).json(result);
    } catch (err) {
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

exports.updateTodo = async (req, res, next) => {
    try {
        const id = req.params.todoId;
        const updateTodo = req.body;
        const updatedTodo = await TodoService.updateTodo(id, updateTodo);
        if (!updatedTodo) {
            return res.status(404).json({ message: 'todo not found' });
        }

        res.status(200).json({ message: 'updated todo' });
    } catch (error) {
        next(error);
    }
};

exports.getAllTodos = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        const allTodo = await TodoService.getTodos(userId);

        res.status(200).json(allTodo);
    } catch (error) {
        next(error);
    }
};
