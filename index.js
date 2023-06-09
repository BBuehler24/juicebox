require('dotenv').config();

const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');

server.use(morgan('dev')); // function that logs out the incoming requests (ex: GET / 404 7.430 ms - 139)
server.use(express.json()); // function that reads incoming JSON from requests (able to easily send object to server)
server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  // server.get('/background/:color', (req, res, next) => {
  //   res.send(`
  //     <body style="background: ${ req.params.color };">
  //       <h1>Hello World</h1>
  //     </body>
  //   `);
  // });

  // server.get('/add/:first/to/:second', (req, res, next) => {
  //   res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
  //     Number(req.params.first) + Number(req.params.second)
  //    }</h1>`);
  // });

const { client } = require('./db');
client.connect();

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});