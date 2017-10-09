//import express and express handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');

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
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;

const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
