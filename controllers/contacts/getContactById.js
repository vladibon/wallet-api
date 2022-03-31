const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOne({ _id: contactId, owner: _id }).populate(
    'owner',
    'email',
  );

  if (!result) throw new NotFound();

  res.json(result);
};

module.exports = getContactById;
