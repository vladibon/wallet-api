const { BadRequest } = require('http-errors');
const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  if (page < 1 || limit < 1)
    throw new BadRequest('Page and limit must be positive');

  const filter = favorite ? { owner: _id, favorite } : { owner: _id };
  const skip = (page - 1) * limit;

  res.json(
    await Contact.find(filter, '', { skip, limit }).populate('owner', 'email'),
  );
};

module.exports = listContacts;
