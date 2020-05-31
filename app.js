var express = require('express');
var bodyParser = require('body-parser');
var EmailRouter = require('./routes/EmailRouter');
var ContactRouter = require('./routes/ContactRouter');
var TaxRouter = require('./routes/TaxRouter');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 1780;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    next();
});

app.use('/email', EmailRouter);
app.use('/contact', ContactRouter);
app.use('/tax', TaxRouter);

const server = app.listen(PORT, HOST, () => {
	const host = server.address().address;
    const port = server.address().port;
	console.log(`RESTful API server started on: ${host}:${port}`);
});