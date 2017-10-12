//import express and express handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');
const bbcApiKey = '537b165a4f314fedae8cb39788d4d713';
// const bbcApi = require('.yy/bbc-api')
// const ftApi = require('./headlines.js');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let handlebars = exphbs.create({
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
  "resultContext" : {"aspects" :["title","lifecycle","location","summary","editorial" ]}}`
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  const queryBody = JSON.parse(body);
  const query = queryBody.query.queryString;
  const queryResult = queryBody.results[0];
  res.render(('../views/layouts/main.html'), {query: query, queryResult: queryResult});
});
});

app.get('/bbc', (req, res) => {
  console.log('hello')
  res.render('../views/layouts/bbc.html');
});

app.post('/bbc', (req, res) => {
  const queryBBC = req.body.queryBBC;
  const optionsBBC = { method: 'GET',
  url: `https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=${bbcApiKey}`
};

request(optionsBBC, (error, response, body) => {
  if (error) throw new Error(error);
  const queryBBC = JSON.parse(body);
  console.log(queryBBC)
  res.render('../views/layouts/bbc.html');
});
});

const PORT = process.env.PORT || 5000;

const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});


module.exports = listen;
