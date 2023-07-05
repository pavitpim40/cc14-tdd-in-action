const httpMocks = require('node-mocks-http');
const TodoController = require('../../controllers/todo.controller');
const { Todo } = require('../../models');
const newTodo = require('../mock-data/new-todo.json');

let req, res, next;
beforeAll(() => {
    Todo.create = jest.fn();
    Todo.update = jest.fn();
    Todo.findByPk = jest.fn();
    Todo.findAll = jest.fn();
});

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe('TodoController.createTodo', () => {
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call TodoModel.create', () => {
        // Arrange
        req.body = newTodo;

        // Act
        TodoController.createTodo(req, res, next);

        // Assert
        expect(Todo.create).toBeCalledWith(newTodo);
        expect(Todo.create).toBeCalledTimes(1);
    });

    it('should return 201 response code', async () => {
        // Arrange
        req.body = newTodo;
        Todo.create.mockReturnValue(newTodo);

        // Act
        await TodoController.createTodo(req, res, next);

        // Assert
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        // Arrange
        req.body = newTodo;
        Todo.create.mockReturnValue(newTodo);

        // Act
        await TodoController.createTodo(req, res, next);

        // Assert
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it('should handle errors', async () => {
        // Arrange
        const errorMessage = { message: 'Done property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        Todo.create.mockReturnValue(rejectedPromise);

        // Act
        await TodoController.createTodo(req, res, next);

        // Assert
        expect(next).toBeCalledWith(errorMessage);
    });
});
