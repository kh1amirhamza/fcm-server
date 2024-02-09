//import * as admin from 'firebase-admin';
const admin = require('firebase-admin');
//var serviceAccount = require('../fcm/medicine-delivery-e726b-firebase-adminsdk-x5fl6-5a57e22959.json')
var serviceAccount = require('../vehicle-198c4-firebase-adminsdk-rh5n9-b0b0e3cca3.json')

var adminInit = false;


module.exports = {

    sendFcmNotification(req, res, title, body, tokens){

//     // var fcmData = req.body;
//     // var title = fcmData.title;
//     // var body = fcmData.body;
//     // var id = fcmData.id;
sendFcmNotiication(req, res, title, body, tokens);

}
}
function sendFcmNotiication(req, res, title, body, tokens){

  // if (adminInit==false) {
  //   admin.initializeApp({
  //       credential: admin.credential.cert(serviceAccount),
  //       databaseURL: 'https://vehicle-198c4.firebaseio.com'
  //   });
  //   adminInit = true;
  // }
  
  // These registration tokens come from the client FCM SDKs.
  //const registrationTokens = [ "dNwC_2vMTNuTllSgnMZXUl:APA91bEW01EvfIWMreJGhbVyN_62YOMkeYCFGfkYIdzGVumf6EBgJmhoJfsOlKJGvtmvsqBw0u5h-_dEXauXy63iD49bNYHVF8c7K1ImKiGl1DVlPNw92TED0d-DOFTVBaaW_HiR61s0" ];
  
  const message = {
    data:{
        title : title,
        body: body
      },
    //   notification:{ 
    //     "body": "My notification!"
    // },
    // notification : {
    //    // "click_action" : ".MainActivity", 
    //    title : title,
    //    body: body
        
    // }, 
    
    tokens: tokens,
  };
  
  admin.messaging().sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
        res.json({"message": "List of tokens that caused failures: "+ failedTokens})
      res.end();
      }else{
          console.log("Notificaiton Sent!");
          res.json({"message": "Notification send successfully"})
          res.end();
      }
      
    });
}

