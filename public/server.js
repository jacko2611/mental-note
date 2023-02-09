const express = require('express');
const api = require('./routes/apiRoutes.js');
const html = require('./routes/frontEndroutes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => 
    console.log(`We're listening on port ${PORT}`)
);