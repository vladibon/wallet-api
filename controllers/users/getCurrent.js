const getCurrent = async (req, res) => {
  const { email, name, balance, categories, subscription, avatarURL, createdAt } = req.user;

  res.json({
    email,
    name,
    balance,
    categories,
    subscription,
    avatarURL,
    signupDate: createdAt,
  });
};

module.exports = getCurrent;
