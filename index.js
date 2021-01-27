/* eslint-disable no-console */
const express = require('express');
// instantiate express app
const app = express();
// initialize port
const PORT = process.env.PORT || 5500;

// if not in prod, use morgan
if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// send static files
app.use(express.static('public'));

// listen on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
