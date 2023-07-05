const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todo.json');
const { Todo, User } = require('../../models');

const db = require('../../models');

const endpointUrl = '/api/1.0/todos/';

beforeAll(async () => {
    await db.sequelize.sync();
    await User.create({
        username: 'user1',
        password: 'P4ssword',
        email: 'codecamp@mail.com',
    });
});

afterEach(async () => {
    await Todo.destroy({ truncate: true });
});

afterAll(async () => {
    await db.sequelize.sync({ force: true });
});

describe(endpointUrl, () => {
    test('POST' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);
        // console.log(response);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.completed).toBe(newTodo.completed);
    });

    // test('should return error 500 on malformed data with POST' + endpointUrl, async () => {
    //     const response = await request(app)
    //         .post(endpointUrl)
    //         .send({ title: 'Missing done property' });
    //     expect(response.statusCode).toBe(500);

    //     expect(response.body).toStrictEqual({
    //         message: 'notNull Violation: Todo.complete cannot be null',
    //     });
    // });

    test('GET' + endpointUrl, async () => {
        await Todo.bulkCreate(allTodos);

        const response = await request(app).get(endpointUrl + '1');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].completed).toBeDefined();
    });

    test('GET by id' + endpointUrl + ':todoId', async () => {
        await Todo.create(newTodo);

        const response = await request(app).get(endpointUrl + 'todo/' + 1);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.completed).toBe(newTodo.completed);
    });

    test('GET todo by id doesnt exist' + endpointUrl + ':todoId', async () => {
        const response = await request(app).get(endpointUrl + 'todo/' + 123);
        expect(response.statusCode).toBe(404);
    });

    // test('PUT' + endpointUrl, async () => {
    //     const todo = await Todo.create(newTodo);
    //     const response = await request(app)
    //         .put(endpointUrl + todo.id)
    //         .send({ title: 'Upd ated title', done: true });
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.title).toBe('Updated title');
    //     expect(response.body.done).toBe(true);
    // });

    // test('should return 404 on PUT' + endpointUrl, async () => {
    //     const response = await request(app)
    //         .put(endpointUrl + '123')
    //         .send({ title: 'Updated title', done: true });
    //     expect(response.statusCode).toBe(404);
    // });

    // test('should return error 500 on malformed data with PUT' + endpoint){
    // 	const todo = await Todo.create(newTodo);
    // 	const response = await request(app)
    // 		.put(endpointUrl + todo.id)
    // 		.send({ title: 'Updated title', done: true });
    // 	expect(response.statusCode).toBe(200);
    // 	expect(response.body.title).toBe('Updated title');
    // 	expect(response.body.done).toBe(true);

    // }
});
