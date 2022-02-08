var express = require("express");
var router = express.Router();
const {Counter} = require("../Model/Counter.js");
const {User} = require("../Model/User.js");

router.post("/register", (req,res) => {
    let tepm = req.body;
    Counter.findOne({name : "counter"}).then((doc) => {
        tepm.userNum = doc.userNum;
        const userData = new User(tepm);
        userData.save().then(() => {
        Counter.updateOne({name: "counter", $inc : {userNum : 1}}).then(() => {
            res.status(200).json({success : true});
        })
    })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({success : false});
        
    })

    
    
})

router.post("/namecheck", (req,res) => {
    User.findOne({displayName : req.body.displayName })
    .exec()
    .then((doc) => {
        let check = true;
        if(doc){
            check = false;
        }
        res.status(200).json({success : true, check});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({success : false});
    });
});
module.exports = router;