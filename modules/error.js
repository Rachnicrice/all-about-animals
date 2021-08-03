'use strict';

function error(error, response) {
  console.error(error);
  return response.status(500).send('Oops! That wasn\'t supposed to happen...');
}

module.exports = error;