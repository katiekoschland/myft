const isomorphicFetch = require('isomorphic-fetch');

const body = JSON.stringify({
  'queryString': 'banks',
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
  console.log(response.status);
  console.log(response.headers);
  console.log(response.url);
})
.catch(e => {
  throw e;
});
