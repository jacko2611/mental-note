const express = require('express');
const api = require('./routes/index');
const html = require('./routes/frontEndroutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => 
    console.log(`We're listening on port ${PORT}`)
);