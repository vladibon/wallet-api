const { BadRequest } = require('http-errors');
const { User } = require('../../models');

const addCategory = async (req, res) => {
  const { _id } = req.user;
  const { type, category } = req.body;

  if (type === undefined || !category)
    throw new BadRequest('Category type and name should be provided');

  const user = await User.findById(_id);

  const newCategories = {
    income: [...user.categories.income],
    expense: [...user.categories.expense],
  };
  type ? newCategories.income.push(category) : newCategories.expense.push(category);

  await User.findByIdAndUpdate(_id, {
    categories: newCategories,
  });

  res.status(201).json({
    message: `New category "${category}" created successfully`,
    categories: newCategories,
  });
};

module.exports = addCategory;
