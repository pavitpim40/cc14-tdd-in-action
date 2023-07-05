const { Todo } = require('../models');

const createTodo = async (newTodo) => {
    try {
        let todo = await Todo.create(newTodo);
        return todo;
    } catch (err) {
        throw new Error(err);
    }
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

const getTodos = async () => {
    return await Todo.findAll();
};

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo,
    getTodoById,
    getTodos,
};