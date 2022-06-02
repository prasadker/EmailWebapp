const express = require('express')
require("dotenv").config()
const app = express()
const { EmailClient } = require("@azure/communication-email")
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";
const emailsubject = process.env["EMAIL_SUBJECT"] || "";
const port = process.env.PORT || 3000


app.get('/email', (req, res) => {
    async function main() {
        try {            
        var client = new EmailClient(connectionString);
        //send mail
        const emailMessage = {
            sender: senderAddress,
            content: {
            subject: emailsubject,
            plainText: "<This email message is sent from Azure Communication Service Email using JS SDK.>"
            },
            recipients: {
            to: [
                {
                email: recipientAddress,
                },
            ],
            },
        };
        var response = await client.send(emailMessage);
        res.send('Message sent successfully with message ID : ' + response.messageId)
     } catch (e) {
         res.send(e);
       console.log(e);
     }
    }
    main(); 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})