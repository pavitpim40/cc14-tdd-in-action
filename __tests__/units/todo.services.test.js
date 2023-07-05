const TodoServices = require('../../services/todo.services');
const { Todo } = require('../../models');
const newTodo = require('../mock-data/new-todo.json');
const allTodo = require('../mock-data/all-todo.json');

// Mocking - Test Doubles

// beforeAll()
beforeEach(() => {
    Todo.create = jest.fn();
    Todo.destroy = jest.fn();
    Todo.update = jest.fn();
    Todo.findByPk = jest.fn();
    Todo.findAll = jest.fn();
});

describe('TodoServices.createTodo', () => {
    it('should have a createTodo function', () => {
        expect(TodoServices.createTodo).toBeInstanceOf(Function);
    });

    it('should call TodoModel.create', () => {
        // Act
        TodoServices.createTodo();

        // Assert
        expect(Todo.create).toBeCalled();
    });

    it('should call TodoModel.create with newTodo', () => {
        // Act
        TodoServices.createTodo(newTodo);

        // Assert
        expect(Todo.create).toBeCalledWith(newTodo);
    });

    it('should return a promise', () => {
        // Arrange
        Todo.create.mockReturnValue(newTodo);

        // Act
        const result = TodoServices.createTodo(newTodo);

        // Assert
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a promise that resolves to newTodo', async () => {
        // Arrange
        Todo.create.mockReturnValue(newTodo);

        // Act
        const result = await TodoServices.createTodo();

        // Assert
        expect(result).toBe(newTodo);
    });

    it('should throw an error when TodoModel.create rejects', async () => {
        // Arrange
        const rejectedPromise = Promise.reject(new Error('Fake Error'));
        Todo.create.mockReturnValue(rejectedPromise);

        // Act
        const result = TodoServices.createTodo();

        // Assert
        expect(result).rejects.toThrowError('Fake Error');
    });
});

describe('TodoServices.deleteTodo', () => {
    it('should have a deleteTodo function', () => {
        expect(TodoServices.deleteTodo).toBeInstanceOf(Function);
    });

    it('should call TodoModel.destroy', () => {
        // Act
        TodoServices.deleteTodo();

        // Assert
        expect(Todo.destroy).toBeCalled();
    });

    it('should call TodoModel.destroy with id', () => {
        // Act
        TodoServices.deleteTodo();

        // Assert
        expect(Todo.destroy).toBeCalledWith({ where: {} });
    });

    it('should return a promise', () => {
        // Arrange
        // Todo.destroy.mockReturnValue([1]);

        // Act
        const result = TodoServices.deleteTodo();

        // Assert
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a promise that resolves to 1', async () => {
        // Arrange
        Todo.destroy.mockReturnValue(1);

        // Act
        const result = await TodoServices.deleteTodo();

        // Assert
        expect(result).toBe(1);
    });

    it('should throw an error when TodoModel.destroy rejects', async () => {
        // Arrange
        const rejectedPromise = Promise.reject(new Error('Fake Error'));
        Todo.destroy.mockReturnValue(rejectedPromise);

        // Act
        const result = TodoServices.deleteTodo();

        // Assert
        await expect(result).rejects.toThrowError('Fake Error');
    });
});

describe('TodoServices.updateTodo', () => {
    it('should have a updateTodo function', () => {
        expect(TodoServices.updateTodo).toBeInstanceOf(Function);
    });

    it('should call TodoModel.update', () => {
        // Act
        TodoServices.updateTodo();

        // Assert
        expect(Todo.update).toBeCalled();
    });

    it('should call TodoModel.update with id and updateData', () => {
        // Arrange
        const updateData = { ...newTodo, title: 'update name' };

        // Act
        TodoServices.updateTodo(1, updateData);

        // Assert
        expect(Todo.update.mock.calls).toHaveLength(1);
        expect(Todo.update).toHaveBeenCalledTimes(1);
        expect(Todo.update.mock.calls[0][0]).toEqual(updateData);
        expect(Todo.update).toBeCalledWith(updateData, { where: { id: updateData.id } });
    });

    it('should return a promise', () => {
        // Arrange
        Todo.update.mockReturnValue([1]);

        // Act
        const result = TodoServices.updateTodo();

        // Assert
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a promise that resolves to update Todo', async () => {
        // Arrange
        const updatedTodo = { ...newTodo, title: 'update name' };
        Todo.update.mockReturnValue(updatedTodo);

        // Act
        const result = await TodoServices.updateTodo();

        // Assert
        expect(result).toBe(updatedTodo);
    });

    it('should throw an error when TodoModel.update rejects', async () => {
        // Arrange
        const rejectedPromise = Promise.reject(new Error('Fake Error'));
        Todo.update.mockReturnValue(rejectedPromise);

        // Act
        const result = TodoServices.updateTodo();

        // Assert
        await expect(result).rejects.toThrowError('Fake Error');
    });
});

describe('TodoServices.getTodoById', () => {
    it('should have a getTodoById function', () => {
        expect(TodoServices.getTodoById).toBeInstanceOf(Function);
    });

    it('should call TodoModel.findByPk', () => {
        // Act
        TodoServices.getTodoById();

        // Assert
        expect(Todo.findByPk).toBeCalled();
    });

    it('should call TodoModel.findByPk with id', () => {
        // Act
        TodoServices.getTodoById(1);

        // Assert
        expect(Todo.findByPk).toBeCalledWith(1);
        expect(Todo.findByPk.mock.calls[0][0]).toEqual(1);
        expect(Todo.findByPk).toBeCalledTimes(1);
    });

    it('should return a promise', () => {
        // Act
        const result = TodoServices.getTodoById();

        // Assert
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a promise that resolves to todo', async () => {
        // A
        const todo = { ...newTodo, id: 1 };
        Todo.findByPk.mockReturnValue(todo);

        // Act
        const result = await TodoServices.getTodoById(1);

        // Assert
        expect(result).toBe(todo);
    });

    it('should throw an error when TodoModel.findByPk rejects', async () => {
        // Arrange
        const rejectedPromise = Promise.reject(new Error('Fake Error'));
        Todo.findByPk.mockReturnValue(rejectedPromise);
        // Todo.findByPk.mockImplementation(() => rejectedPromise);

        // Act
        const result = TodoServices.getTodoById(1);

        // Assert
        expect(result).rejects.toThrowError('Fake Error');
    });
});

describe('TodoServices.getTodos', () => {
    it('should have a getTodos function', () => {
        expect(TodoServices.getTodos).toBeInstanceOf(Function);
    });

    it('should call TodoModel.findAll', () => {
        TodoServices.getTodos();
        expect(Todo.findAll).toBeCalled();
    });

    it('should call TodoModel.findAll with userId', () => {
        // Arrange
        const userId = 1;

        // Act
        TodoServices.getTodos(userId);

        // Assert
        expect(Todo.findAll.mock.calls[0][0]).toEqual({ where: { userId } });
        expect(Todo.findAll).toBeCalledWith({ where: { userId } });
        expect(Todo.findAll).toBeCalledTimes(1);
    });

    it('should return a promise', () => {
        // Arrange
        Todo.findAll.mockReturnValue([]);

        // Act
        const result = TodoServices.getTodos();

        // Assert
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a promise that resolves to todos', async () => {
        // Todo.findAll.mockReturnValue(allTodo);
        // Todo.findAll.mockResolvedValue(allTodo);
        Todo.findAll.mockImplementation(() => Promise.resolve(allTodo));

        // Act
        const result = await TodoServices.getTodos();

        // Assert
        expect(result).toBe(allTodo);
    });

    it('should throw an error when TodoModel.findAll rejects', async () => {
        // Arrange
        const rejectedPromise = Promise.reject(new Error('Fake Error'));
        Todo.findAll.mockReturnValue(rejectedPromise);

        // Act
        const result = TodoServices.getTodos();

        // Assert
        await expect(result).rejects.toThrowError('Fake Error');
    });
});
