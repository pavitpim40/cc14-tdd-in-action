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

describe('TodoController.getTodoById', () => {
    it('should have a getTodoById', () => {
        expect(typeof TodoController.getTodoById).toBe('function');
    });

    it('should call TodoModel.findByPk', async () => {
        // Arrange
        req.params.todoId = 1;
        Todo.findByPk.mockReturnValue(newTodo);

        // Act
        await TodoController.getTodoById(req, res, next);

        // Assert
        expect(Todo.findByPk).toBeCalledWith(req.params.todoId);
        expect(Todo.findByPk).toBeCalledTimes(1);
    });

    it('should return json body and response code 200', async () => {
        // Arrange
        req.params.todoId = 1;
        Todo.findByPk.mockReturnValue(newTodo);

        // Act
        await TodoController.getTodoById(req, res, next);

        // Assert
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return 404 when item does not exist', async () => {
        // Arrange
        Todo.findByPk.mockReturnValue(null);

        // Act
        await TodoController.getTodoById(req, res, next);

        // Assert
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
        // Arrange
        const errorMessage = { message: 'error finding todoModel' };
        const rejectedPromise = Promise.reject(errorMessage);
        Todo.findByPk.mockReturnValue(rejectedPromise);

        // Act
        await TodoController.getTodoById(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});
