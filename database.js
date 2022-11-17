const admin=require('firebase-admin');

var serviceAccount = require('./admin.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-api-latest-default-rtdb.firebaseio.com/",
    storageBucket: "gs://my-api-latest.appspot.com",
    authDomain: "my-api-latest.firebaseapp.com",
  });

var db=admin.database();
var userRef=db.ref("data");

const userOperation={
    addUser(obj,res){
        var oneUser=userRef.child(obj.roll);
        oneUser.update(obj,(err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"msg":"user created sucessfully"});
            }
        })
    },
    demoUser(obj,res){
        var userRefdemo=db.ref("demousers");
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.push(obj,(err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"msg":"user created sucessfully"});
            }
        })
    },
    getUsers(res){
        userRef.once('value',function(snap){
            var arr = [];
            for(var i = 0; i<snap.val().length; i++)
            {
                if(snap.val()[i]!=null && snap.val()[i]!=undefined && snap.val()[i]!='')
                {
                    console.log(snap.val()[i])
                    arr.push(snap.val()[i]);
                }
            }
            res.status(200).json({"users":arr});
        })
    },
    getOneUser(obj,res){
        var userRefdemo=db.ref("users");
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.once('value',function(snap){
            res.status(200).json({"user":snap.val()});
        })
    }
}

module.exports=userOperation;