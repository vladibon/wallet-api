const updateContact = require('./updateContact');

const updateStatusContact = async (req, res) => await updateContact(req, res);

module.exports = updateStatusContact;
