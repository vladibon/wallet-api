const { BadRequest } = require('http-errors');
const { User } = require('../../models');

const updateName = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;

  if (!name) throw new BadRequest('New name should be provided');
  if (!name.trim().length) throw new BadRequest('Name should be at least 1 character long');
  if (name.trim().length > 12) throw new BadRequest("Name shouldn't be longer than 12 character");

  const updatedUser = await User.findByIdAndUpdate(_id, { name: name.trim() }, { new: true });

  res.status(200).json({
    message: 'User name updated successfully',
    name: updatedUser.name,
  });
};

module.exports = updateName;
