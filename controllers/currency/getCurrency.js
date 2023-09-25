const axios = require('axios');

const getCurrency = async (_, res) => {
  const { data } = await axios('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

  res.json(data);
};

module.exports = getCurrency;
