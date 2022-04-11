const formatDate = data =>
  data.map(tr => ({
    ...tr._doc,
    date: tr.date.toLocaleString('en-GB').split('/').join('.').replace(',', '').slice(0, 10),
  }));

module.exports = {
  formatDate,
};
