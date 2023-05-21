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

const { client } = require('./db');
client.connect();

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});