const mongoose = require('mongoose');
const config = {useNewUrlParser: true, useUnifiedTopology: true };
//const hellometDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/hellomet?retryWrites=true&w=majority";
const fcmDbConnectUrl = "mongodb+srv://amirhamza:amirhamza@cluster0.mb2pom6.mongodb.net/fcm?retryWrites=true&w=majority";
//var URL = "mongodb+srv://ecommerce:amirhamza@cluster0.p4fnz.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
    getFcmDbConnection(){
        return mongoose.createConnection(fcmDbConnectUrl, config, function(error, result){
            if (error) {
                console.log(error)
            }else{
                console.log("Connected with FCM Db!")
            }
        });
    }
}