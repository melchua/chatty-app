
var params = process.argv.slice(2);
var request = require('request');
var BASE_URL = 'https://icanhazdadjoke.com/';
var options = {
                json: true,
                url: BASE_URL,
                method: "GET"
              };


function searchForAtMost3Jokes(search) {
  options.url+= `search?term=${search}&limit=3`;
  request(options, (err,res,body) => {
    if(err) {
      console.error(err);
      return;
    }
    const results = body.results;
    results.reverse().forEach( (result) => {
      console.log(`${result.joke}\n`);
    });
  });
}


function getRandomDadJoke(cb) {
// get random dad joke
  request(options, (err, res, body) => {
    if(err) {
      console.error(err);
      return;
    }
    cb(body.joke);
  });
}

// getRandomDadJoke( (bj)=> {
//   console.log(bj);
// });

// searchForAtMost3Jokes(params);

export default getRandomDadJoke;