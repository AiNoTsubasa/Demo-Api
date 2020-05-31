'use strict';

const Tax = require('../models/Tax');
const express = require('express');

const tax = new Tax();
const router = express();

router.post('/calculate', (req, res) => {
	console.log('Request to calculate tax with body:', req.body);

	let netIncome = req.body.netIncome;
	let numberNetIncome = Number(netIncome.toString().replace(",", ""));

	if( !isNaN(numberNetIncome) ) {
		let calculateResult = tax.calculateTax(numberNetIncome);
		console.log('Results of calculate tax is:', calculateResult);
		res.send(calculateResult);
	} else {
		console.log('Error to calculate tax because data invalid.');
		res.status(400);
		res.send('Something went wrong!');
	}
});

module.exports = router;