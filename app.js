const express = require('express');
const { User } = require('./models');
const TodoController = require('./controllers/todo.controller');

const app = express();
// User.create({
//     username: 'user1',
//     password: 'P4ssword',
//     email: 'c@mail.com',
//     birthDate: '1999-01-01',
// });

app.use(express.json());

app.post('/api/1.0/todos', TodoController.createTodo);
app.get('/api/1.0/todos/todo/:todoId', TodoController.getTodoById);
app.get('/api/1.0/todos/:userId', TodoController.getAllTodos);

module.exports = app;
