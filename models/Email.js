const axios = require('axios');

class Email {
    
    constructor() {
        this.SENDGRID_SEND_API_URL = process.env.SENDGRID_SEND_API_URL || 'https://api.sendgrid.com/v3/mail/send';
        this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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';
        this.SENDER_NAME = process.env.SENDER_NAME || 'Test';
        this.SENDER_EMAIL = process.env.SENDER_EMAIL || 'test@test.com';
    
        this.REQUEST_HEADER = {
            'Authorization': 'Bearer '+this.SENDGRID_API_KEY,
            'content-type': 'application/json'
        };
    }

    async send(from, to, subject, message, templateID=0) {
        
        let result = { 'status': '001', 'statusText': 'Error' };
        let sendMessage = ( templateID > 0 ) ? this.getMessageFromTemplate(templateID) : message ;

        const messageParam = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": to,
                            "name": to
                        }
                    ],
                    "subject": subject
                }
            ],
            "content": [
                {
                    "type": "text/plain", 
                    "value": sendMessage
                }
            ],
            "from": {
                "email": from || this.SENDER_EMAIL,
                "name": from || this.SENDER_NAME
            }
        };

        let sentResult = await axios.post(this.SENDGRID_SEND_API_URL, messageParam, { 'headers': this.REQUEST_HEADER });
        if( sentResult.status === 202 ) {
            result.status = '000';
            result.statusText = 'Success';
        }

        return result;
    }

    getMessageFromTemplate(templateID) {
        // Get message from template
        return templateID.toString();
    }

    
}

module.exports = Email;