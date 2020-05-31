'use strict';

const Contact = require('../models/Contact');
const express = require('express');

const contact = new Contact();
const router = express();

router.get('/userID/:userID', async (req, res) => {
	const userID = Number(req.params.userID);
	console.log('Request to get contact groups data of userID: '+userID);

	if( userID && userID > 0 ) {
		let contactList = await contact.getGroupsFromUser(userID);
		console.log('Results of get contact groups data of userID: '+userID+' is:', contactList);
		res.send(contactList);
	} else {
		console.log('Error while get contact groups data of userID: '+userID);
		res.status(400);
		res.send('Something went wrong!');
	}
});

router.post('/userID/:userID/insert', async (req, res) => {
	const userID = Number(req.params.userID);
	const groupData = req.body;
	console.log('Request to insert contact group data of userID: '+userID+' with body:', groupData);

	if( userID && userID > 0 ) {
		let insertResult = await contact.insertGroupForUser(userID, groupData);
		console.log('Results of insert contact group data of userID: '+userID+' is:', insertResult);
		res.send(insertResult);
	} else {
		console.log('Error while insert contact group data of userID: '+userID);
		res.status(400);
		res.send('Something went wrong!');
	}

});

router.get('/userID/:userID/groupID/:groupID', async (req, res) => {
	const userID = Number(req.params.userID);
	const groupID = Number(req.params.groupID);
	console.log('Request to get contact group data of userID: '+userID+' and groupID: '+groupID);

	if( (userID && userID > 0) && (groupID && groupID > 0) ) {
		let groupData = await contact.getGroupDataFromUser(userID, groupID);
		console.log('Results of get contact group data of userID: '+userID+' and groupID: '+groupID+' is:', groupData);
		res.send(groupData);
	} else {
		console.log('Error while insert contact group data of userID: '+userID);
		res.status(400);
		res.send('Something went wrong!');
	}

});

router.post('/userID/:userID/groupID/:groupID/insert', async (req, res) => {
	const userID = Number(req.params.userID);
	const groupID = Number(req.params.groupID);
	const contactData = req.body;
	console.log('Request to insert contact data of userID: '+userID+' and groupID: '+groupID+' with body:', contactData);

	if( (userID && userID > 0) && (groupID && groupID > 0) && (contactData && contactData.hasOwnProperty('firstName')) ) {
		let insertResult = await contact.insertContactData(userID, groupID, contactData);
		console.log('Results of insert contact data of userID: '+userID+' and groupID: '+groupID+' is:', insertResult);
		res.send(insertResult);
	} else {
		console.log('Error while insert contact data of userID: '+userID+' and groupID: '+groupID+'.');
		res.status(400);
		res.send('Something went wrong!');
	}

});

router.post('/userID/:userID/groupID/:groupID/contactID/:contactID/update', async (req, res) => {
	const userID = Number(req.params.userID);
	const groupID = Number(req.params.groupID);
	const contactID = Number(req.params.contactID);
	const contactData = req.body;
	console.log('Request to update contact data of userID: '+userID+', groupID: '+groupID+' and contactID: '+contactID+' with body:', contactData);

	if( (userID && userID > 0) && (groupID && groupID > 0) && (contactID && contactID > 0) && (contactData && contactData.hasOwnProperty('firstName')) ) {
		let updateResult = await contact.updateContactData(userID, groupID, contactID, contactData);
		console.log('Results of update contact data of userID: '+userID+', groupID: '+groupID+' and contactID: '+contactID+' is:', updateResult);
		res.send(updateResult);
	} else {
		console.log('Error while update contact data of userID: '+userID+', groupID: '+groupID+' and contactID: '+contactID+'.');
		res.status(400);
		res.send('Something went wrong!');
	}

});


module.exports = router;