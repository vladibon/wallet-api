const { BadRequest } = require('http-errors');

const validation = schema => (req, _, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw new BadRequest(error.message);

  next();
};

module.exports = validation;
