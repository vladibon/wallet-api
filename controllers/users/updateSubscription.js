const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription, avatarURL } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({ email, subscription, avatarURL });
};

module.exports = updateSubscription;
