const getCurrent = async (req, res) => {
  const { email, name, balance, categories, subscription, avatarURL } = req.user;

  res.json({
    email,
    name,
    balance,
    categories,
    subscription,
    avatarURL,
  });
};

module.exports = getCurrent;
