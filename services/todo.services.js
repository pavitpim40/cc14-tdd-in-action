const { Todo } = require('../models');

const createTodo = async (newTodo) => {
    let todo = await Todo.create(newTodo);
    return todo;
};

const deleteTodo = async (id) => {
    let affectedRow = await Todo.destroy({
        where: {
            id: id,
        },
    });
    return affectedRow;
};

const updateTodo = async (id, updateTodo) => {
    return await Todo.update(updateTodo, { where: { id: id } });
};

const getTodoById = async (id) => {
    return await Todo.findByPk(id);
};

const getTodos = async (userId) => {
    return await Todo.findAll({
        where: {
            userId: userId,
        },
    });
};

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo,
    getTodoById,
    getTodos,
};
