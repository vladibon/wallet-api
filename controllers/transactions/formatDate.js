const formatDate = data =>
  data.map(tr => ({
    ...tr._doc,
    date: tr.createdAt.toLocaleString('en-GB').split('/').join('.').replace(',', '').slice(0, 16), // .toLocaleDateString() - without time
  }));

module.exports = {
  formatDate,
};
