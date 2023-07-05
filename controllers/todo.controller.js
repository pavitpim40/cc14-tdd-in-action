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
