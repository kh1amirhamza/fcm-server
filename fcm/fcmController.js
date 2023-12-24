const express = require("express");
const fcmRouter = express.Router();
const Update = require('../fcm/update')
//const Delete = require('../fcm/delete')
const Add = require('../fcm/add')
const Get = require('../fcm/get')
const Send = require('../fcm/admin_send_notfication')
const schedule = require('node-schedule');

fcmRouter.post("/", function (req, res) {
   Add.addFCM(req, res);
});

fcmRouter.post("/get", function (req, res) {
    Add.addFCM(req, res);
 });

fcmRouter.post("/send",(req, res)=>{
    let tokens = [];
    tokens.push("none");
    
    if(req.body.tokens.length>0){
        tokens = req.body.tokens;
        console.log(req.body.tokens.length);
    }
    Send.sendFcmNotification(req, res, req.body.title, req.body.body, tokens );
})

fcmRouter.get("/",(req, res)=>{
          res.json({"message": "Server is now Online!"})
          res.end();
})

//update
fcmRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateFCM(id, req, res);
})

//deleteMany
fcmRouter.delete("/", function (req, res) {
    
    console.log(req.body);
    console.log(req.body.ids);
    Delete.deleteManyUser(req, res, req.body.ids);
})

//delete
fcmRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteUser(id, req, res);
})


const rule = new schedule.RecurrenceRule();
rule.second = 10;

// const job = schedule.scheduleJob(rule, function(){
//   console.log('The answer to life, the universe, and everything!');
// });

const job = schedule.scheduleJob('*/14 * * * *', function(fireDate){
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
  });

module.exports = fcmRouter;


