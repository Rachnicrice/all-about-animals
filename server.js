/* eslint-disable comma-dangle */
'use strict';

//dependencies:
const express = require('express');
require('dotenv').config();
const methodOverride = require('method-override');
const client = require('./modules/client.js');
require('ejs');

const app = express();
const PORT = process.env.PORT || 3001;


//import modules:
const error = require('./modules/error.js');

//set up server
app.use(express.urlencoded({ extended: true, }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

//routes
app.get('/', (req, res) => {
  res.render('pages/index', {datesArray: 0, id: false});
});
app.get('/play', (req, res) => {
  res.render('pages/play')
})
// app.get('/:id/search', handleSearch);
// app.post('/:id/searchResults', handleLocation);
// app.post('/user', lookupUser);


//error handlers:
app.get('*', notFoundHandler);
app.use(error);

function notFoundHandler(req, res) {
  res.status(404).send('huh?');
}

function addUser(req, res) {
  let { username, password} = req.body;
  let SQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;

  let safeValues = [username, password];

  client.query(SQL, safeValues)
    .then( results => {
      res.redirect(`/user/${results.rows[0].id}`);
    })
    .catch(error => {
      Error(error, res);
    });
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    })
  })