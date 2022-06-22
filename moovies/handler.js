'use strict';

const api = require('./out/axios')

module.exports.search = async (event) => {
  return await api.run(event);
};
