const express = require('express');

const app = express();
const { ifError } = require("assert");
const { json } = require("body-parser");
app.use(express.json());
var adminInit = false;
// const { initializeApp } = require('firebase-admin/app');
// const app1 = initializeApp();



var admin = require("firebase-admin");
var serviceAccount = require("./vehicle-198c4-firebase-adminsdk-rh5n9-b0b0e3cca3.json");


if (adminInit == false) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tripbd-904af.firebaseio.com"
      });
    adminInit = true;
}


const fcm = require('./fcm/fcmController');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     if (req.method === 'OPTIONS') {
         res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
         return res.status(200).json({});
     }
     next();
});

app.use("/fcm", fcm);


app.get("/otp", function (req, res) {

   // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    //const authToken = process.env.TWILIO_AUTH_TOKEN;
    const accountSid = "AC1b8dea8568f802a824e6b07e00feb971";
    const authToken = "42a4775f0fa4600c96cd535a3fceaea2";
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
        .create({
            to: '+8801705187083',
            from: '+8801580901341',
            body: 'Your TripBd OTP is: 724536'
        })
        .then(message => console.log(message.sid))
        .catch((error) => {
            // You can implement your fallback code here
            console.log(error);
          });;

    console.log("Server is now online!");
          res.json({"message": "Server is now online!"})
          res.end();

 });


app.get("/active", function (req, res) {
    console.log("Server is now online!");
          res.json({"message": "Server is now online!"})
          res.end();
 });


//For Cpanel...
//app.listen(5000);


//For Cloud Hosting...
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Server is running on port :' + PORT);
    }
});
