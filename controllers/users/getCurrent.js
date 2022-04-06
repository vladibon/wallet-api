const getCurrent = async (req, res) => {
  const { email, name, balance } = req.user;

  res.json({ email, name, balance });
};

module.exports = getCurrent;
