//import express and express handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');
// const headlines = require('./headlines.js');

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
  const isomorphicFetch = require('isomorphic-fetch');
  const query = req.body.query

  const body = JSON.stringify({
    'queryString': `${query}`,
    'resultContext' : {
       'aspects' :[ 'title','lifecycle','location','summary','editorial' ],
       'offset' : '100'
      }
  });

  fetch('//api.ft.com/content/search/v1/', {
    method: 'POST',
    body: body,
    headers: {
      'x-api-key': 'a7anxw8mdqq33pfnavcaq66s',
      'content-type': 'application/JSON'
    }
  }).then( response => {
    console.log(body)
    // console.log(response.status);
    // console.log(response.headers);
    // console.log(response.url);
  })
  .catch(e => {
    throw e;
  });
});

const PORT = process.env.PORT || 5000;

const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
