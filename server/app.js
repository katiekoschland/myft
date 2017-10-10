//import express and express handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');

const request = require('request');
const apiKey = 'a7anxw8mdqq33pfnavcaq66s';

const app = express();

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
  const url = `http://api.ft.com/content/search/v1?apiKey=${apiKey}`;
  request(url, (err, response, body) => {
    if (err) {
      res.render('../views/layouts/main.html');
    }
    else {
      let headlines = JSON.parse(body);
    }
  });
});

const PORT = process.env.PORT || 5000;

const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
