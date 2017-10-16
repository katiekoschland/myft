// const onClick = () => {
//   const el = document.getElementById('submit');
//   const latestHeadlines = document.getElementById('latest-headlines');
//
//   el.addEventListener( 'click', (e) => {
//     e.preventDefault();
//     fetch('/api', {
//         method:'POST'
//     })
//     .then( (response => response.json()))
//     .then( (res) => {
//       console.log('SENT');
//       console.log(res);
//     })
//     .catch(e => {
//       console.log('error');
//       console.log(e);
//     });
//   });
//   if (!latestHeadlines.classList.contains('hidden')) {
//     latestHeadlines.classList.add('hidden');
//   }
// });
// }
// onClick();
