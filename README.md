Chatty App (A React Project)
=====================

Chatty App will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

### Screenshot



### Usage

Install and open client/server as per instructions below.

**Commands:**

```
  # Search for an animated gif
  /gif: http://<Imageurl.jpg>

  # Search for a dad joke
  /dadjoke

```

#### Express/WebSockets Server setup

Start the Express/WebSockets server by navigating to ./server.

1. Navigate to ./server
2. Install dependencies using the npm install command.
3. Start the server

```

npm install
node server.js

```

The app will be served at http://localhost:3001/.

#### React Client Server

1. Navigate to root folder
2. Install dependencies using the npm install command.
3. Start the React server

Start the React server using the npm start command. The app will be served at
Go to http://localhost:3000/ in your browser.

```
npm install
npm start

```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### External APIs

* Giphy: to fetch gifs
* icanhazdadjoke: to fetch dad jokes