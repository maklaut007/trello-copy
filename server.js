const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);


const port = process.env.PORT || 5000;;

server.listen(port, () => `Server running on port ${port}`);