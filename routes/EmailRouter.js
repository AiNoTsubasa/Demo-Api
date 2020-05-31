'use strict';

const Email = require('../models/Email');
const express = require('express');

const email = new Email();
const router = express();

router.post('/send', async (req, res) => {
	console.log('Request to send email with body:', req.body);

	let from = req.body.form;
	let to = req.body.to;
	let message = req.body.message;
	let templateID = req.body.templateID;

	if( (from && from.length > 0) && (to && to.length > 0) && (message && message.length> 0) ) {
		let sentEmailResult = await email.send(null ,to, "Hello World!", message, templateID);
		console.log('Sent email with result:', sentEmailResult);
		res.send(sentEmailResult);
	} else {
		console.log('Error to send email because data invalid.');
		res.status(400);
		res.send('Something went wrong!');
	}
});

module.exports = router;