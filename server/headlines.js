const isomorphicFetch = require('isomorphic-fetch');

const query = req.body.query;

const body = JSON.stringify({
  'queryString': `${query}`,
  'resultContext' : {
    'aspects' :[ 'title','lifecycle','location','summary','editorial' ],
  }
});

fetch('//api.ft.com/content/search/v1', {
  method: 'POST',
  body: body,
  headers: {
    'x-api-key': 'a7anxw8mdqq33pfnavcaq66s',
    'content-type': 'application/javascript'
  }
}).then(response => {
  console.log(res)
})
.catch(e => {
  throw e;
});
