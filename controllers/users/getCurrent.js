const getCurrent = async (req, res) => {
  const { email, name, balance, categories } = req.user;

  res.json({ email, name, balance, categories });
};

module.exports = getCurrent;
