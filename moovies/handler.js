'use strict';

const result = require('./domain/result')

module.exports.search = async (event) => {
  console.log(`[INFO] ${Date(Date.now())} Lambda disparada `)
  console.log(`[INFO] Evento recebido: ${JSON.stringify(event)} `)
  return await result.run(event);
};
