'use strict';

console.log(`I'm handling things`);

const client = require('./client.js');
const superagent = require('superagent');
const error = require('./error.js');

function handleEasyQuestions (req, res) {
  const url = `https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple`

  superagent.get(url)
    .then(resultsFromAPI => {
      //Create an object location and return to the front end
      console.log(resultsFromAPI.body.results);
    })
    .catch((err) => {
      error(err, res);
    });
}

function handleHardQuestions (req, res) {
  const url = `https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple`

  superagent.get(url)
    .then(resultsFromAPI => {
      //Create an object location and return to the front end
      console.log(resultsFromAPI.body.results);
    })
    .catch((err) => {
      error(err, res);
    });
}