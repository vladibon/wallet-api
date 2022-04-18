const getCurrent = async (req, res) => {
  const { email, name, balance, categories, subscription } = req.user;

  res.json({ email, name, balance, categories, subscription });
};

module.exports = getCurrent;
