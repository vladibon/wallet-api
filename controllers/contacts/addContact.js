const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const { _id } = req.user;

  res.status(201).json(await Contact.create({ ...req.body, owner: _id }));
};

module.exports = addContact;
