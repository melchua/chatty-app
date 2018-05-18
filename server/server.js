// server./js
const SocketServer = require('ws');

const express = require('express');

const request = require('request');

// Jokes API
var JOKE_URL = 'https://icanhazdadjoke.com/';
const jokeOptions = {
                json: true,
                url: JOKE_URL,
                method: "GET"
              };

// Giphy API
var GIPHY_URL = 'http://api.giphy.com/v1/gifs/search?api_key=0UZMQps0reAG0iklFwBxxKI4m97mPdRL&limit=1';
const giphyOptions = {
                    json: true,
                    url: GIPHY_URL,
                    method: "GET"
                  };
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Make message with UUID function
const makeUUID = require('uuid/v1');


const makeMessage = (messageObj) => {

  let newMessage = messageObj;
  console.log("IN", messageObj);
  newMessage.id = makeUUID();
  console.log("Added ID", newMessage);

  switch(newMessage.type) {
    case "postNotification":
      // handle a notification from client
      newMessage.type = "incomingNotification";
      break;
    case "postMessage":
      // handle a message from client
      newMessage.type = "incomingMessage";
      break;
  }
  console.log("OUT", newMessage);
  return newMessage;

};

const makeUserCountObj = (count) => {
// makes an object of the user count to return to client
  return { count, id: makeUUID(), type: "incomingUserCount"};
};

// Create the WebSockets server
const wss = new SocketServer.Server({server});

// Set up a callback that will run when a cient connects to the server
// When a client connects they are assigned a socket, represented by the ws
// parameter in the callback

let onlineUserCount = 0;

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};


function getRandomDadJoke(cb) {
// get random dad joke
  request(jokeOptions, (err, res, body) => {
    if(err) {
      console.error(err);
      return cb(err);
    }
    console.log(body.joke);
    cb(null, body.joke);
  });
}

function getGiphyURL(cb) {
  request(giphyOptions, (err, res, body) => {
    if(err) {
      console.error(err);
      return cb(err);
    }
    const imageObj = body.data[0].images.original;
    cb(null, imageObj);
  });
}

// getGiphyURL((err, gif) => {
//   console.log('gif: ', gif);
// });

wss.on('connection', (socket) => {
  onlineUserCount = wss.clients.size;
  const usercount = makeUserCountObj(onlineUserCount);
  wss.broadcast(JSON.stringify(usercount));
  console.log('Client connected!!');
  console.log(`IN CONNECTION: There are ${onlineUserCount} users connected, i think...`);

  // now we need code here to broadcast the users to update the state on client

  socket.on('close', () => {
    onlineUserCount = wss.clients.size;
    wss.broadcast(JSON.stringify(usercount));
    console.log('Client disconnected.');
    console.log(`IN CLOSE: There are ${onlineUserCount} users connected, i think...`);
  });

  socket.on('message', function incoming(data) {
    const newMessage = makeMessage(JSON.parse(data));
    console.dir(newMessage, { color: true });
    const gifRegex = /\/gif:\s\S*/;
    const gifRemoveCommandStr = /\/gif:\s/;
    if(newMessage.content === "/dadjoke") {
      console.log('Requesting joke');
      getRandomDadJoke((err, joke) => {
        newMessage.content = joke;
        wss.broadcast(JSON.stringify(newMessage));
      });
    } else if(newMessage.content.match(gifRegex)) {
        console.log('Requesting Giphy');
        console.log(newMessage.content.substring(6));
        const searchTerm = newMessage.content.substring(6);
        giphyOptions.url += `&q=${searchTerm}`;
        console.log(giphyOptions.url);
        getGiphyURL((err, gif) => {
          console.log('gif: ', gif);
          newMessage.content = gif.url;
          console.log(JSON.stringify(newMessage));
          wss.broadcast(JSON.stringify(newMessage));
        });

    } else {
      wss.broadcast(JSON.stringify(newMessage));
    }
  });

  // now we have to return the data
});

