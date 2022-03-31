const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndRemove({ _id: contactId, owner: _id });

  if (!result) throw new NotFound(`Contact with id=${contactId} not found`);

  res.json({ message: 'Contact deleted' });
};

module.exports = removeContact;
