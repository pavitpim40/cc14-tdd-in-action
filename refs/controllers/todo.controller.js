const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.todoId);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

// exports.updateTodo = async (req, res, next) => {
//   try {
//     const { todoId } = req.params;
//     const newTodo = req.body;
//     const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, newTodo, {
//       new: true,
//       useFindAndModify: false,
//     });
//     if (!updatedTodo) {
//       return res.status(404).json({ message: "not found" });
//     }
//     res.status(200).json(updatedTodo);
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const newTodo = req.body;
    const updatedToto = await TodoModel.findByIdAndUpdate(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedToto) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(updatedToto);
  } catch (error) {
    next(error);
  }
};
