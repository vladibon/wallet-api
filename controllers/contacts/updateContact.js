const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body, {
    new: true,
  }).populate('owner', 'email');

  if (!result) throw new NotFound(`Contact with id=${contactId} not found`);

  res.json(result);
};

module.exports = updateContact;
