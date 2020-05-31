const fs = require('fs');

class Contact {
    
    constructor() {
        this.FILE_PATH = './dbs/';
        this.GROUP_PREFIX_FILE_NAME = 'CONTACT_';
        this.GROUP_FILE_TYPE = '.json';
    }

    async getGroupsFromUser(userID) {

        try {
            const fileName = this.getGroupDataFileName(userID);
            const data = fs.readFileSync(fileName);
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
        
    }

    async getGroupDataFromUser(userID, groupID) {

        try {
            const fileName = this.getGroupDataFileName(userID);
            const dataString = fs.readFileSync(fileName);
            const dataList = JSON.parse(dataString);
            let data = dataList.find((data) => {
                return data.groupID === groupID;
            });
            if( !data ) {
                data = {};
            }
            return data;
        } catch (err) {
            return {};
        }
    }

    async insertGroupForUser(userID, groupData) {
        
        const fileName = this.getGroupDataFileName(userID);
        let userGroups = await this.getGroupsFromUser(userID);
        if( !userGroups ) {
            userGroups = [];
        }

        groupData.groupID = this.getGroupDataID(userGroups);
        groupData.member = [];
        userGroups.push(groupData);

        if( this.writeFile(fileName, userGroups) ) {
            return { 'status': '000', 'statusText': 'Success' };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }
        // let data = JSON.stringify(userGroups, null, 2);
        // try {
        //     fs.writeFileSync(fileName, data);
        //     return { 'status': '000', 'statusText': 'Success' };
        // } catch (err) {
        //     return { 'status': '001', 'statusText': 'Error' };
        // }
        
    }

    async insertContactData(userID, groupID, contactData) {

        const fileName = this.getGroupDataFileName(userID);
        let groupData = await this.getGroupsFromUser(userID);
        for(let i=0; i<groupData.length; i++) {
            const objGroupID = groupData[i].groupID;
            if( objGroupID === groupID ) {
                contactData.contactID = this.getContactDataID(groupData[i].member);
                groupData[i].member.push(contactData);
            }
        }

        if( this.writeFile(fileName, groupData) ) {
            return { 'status': '000', 'statusText': 'Success' };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }

    }

    async updateContactData(userID, groupID, contactID, contactData) {

        const fileName = this.getGroupDataFileName(userID);
        let groupData = await this.getGroupsFromUser(userID);
        for(let i=0; i<groupData.length; i++) {
            if( groupData[i].groupID === groupID ) {
                let member = groupData[i].member;
                for(let j=0; j<member.length; j++) {
                    const objContactID = member[j].contactID;
                    if( objContactID === contactID ) {
                        contactData.contactID = contactID;
                        member[j] = contactData;
                    }
                }
            }
        }

        if( this.writeFile(fileName, groupData) ) {
            return { 'status': '000', 'statusText': 'Success' };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }

    }

    writeFile(fileName, data) {
        let writeData = JSON.stringify(data, null, 2);
        try {
            fs.writeFileSync(fileName, writeData);
            return true;
        } catch (err) {
            return false;
        }

    }

    getGroupDataFileName(userID) {
        return this.FILE_PATH + this.GROUP_PREFIX_FILE_NAME + userID + this.GROUP_FILE_TYPE;
    }

    getGroupDataID(groupData) {
        return (groupData.length + 1);
    }

    getContactDataID(member) {
        return (member.length + 1);
    }
    
}

module.exports = Contact;