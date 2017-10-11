//import express and express handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');
// const ftApi = require('./headlines.js');
const isomorphicFetch = require('isomorphic-fetch');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let handlebars = exphbs.create({
  defaultLayout: 'main',
  extname: '.html'
});

//setup handlebars as the view engine
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', (req,res) => {
  res.render('../views/layouts/main.html');
});

app.post('/', (req,res) => {
  const query = req.body.query;
  const options = { method: 'POST',
  url: 'http://api.ft.com/content/search/v1',
  headers:
  { 'content-type': 'application/javascript',
  'x-api-key': 'a7anxw8mdqq33pfnavcaq66s' },
  body:
  `{"queryString": "${query}",
  "resultContext" : {"aspects" :["title"]}}`
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  const queryBody = JSON.parse(body);
  const query = queryBody.query.queryString;
  const queryResult = queryBody.results[0];
  res.render(('../views/layouts/main.html'), {query: query, queryResult: queryResult});
});
});

const PORT = process.env.PORT || 5000;

const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
