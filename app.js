const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alert = require('alert');

mongoose.connect("mongodb+srv://admin-tushar:pswd6920@cluster0.lngsx.mongodb.net/riddle",{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


function value(a)
{
 for(let i=0;i<20;++i)
 {
   if(a===locations[i])
    return i;
 }
}

function complete(a)
{
  return a.location === 5; 
}
function showDiff(date1, date2){

  var diff = (date2 - date1)/1000;
  diff = Math.abs(Math.floor(diff));

  var days = Math.floor(diff/(24*60*60));
  var leftSec = diff - days * 24*60*60;

  var hrs = Math.floor(leftSec/(60*60));
  var leftSec = leftSec - hrs * 60*60;

  var min = Math.floor(leftSec/(60));
  var leftSec = leftSec - min * 60;

  document.getElementById("showTime").innerHTML = "You have " + days + " days " + hrs + " hours " + min + " minutes and " + leftSec + " seconds.";
}

const raste = [
  [
    "I am a string of characters that holds the keys to unlock secrets,",
    "but I must be guarded with utmost care. I can be short or long,",
    "simple or complex, and I am the lifeblood of modern computing.",
    "What am I?"
  ],
  [
    "A girl has many brothers and sisters, but each brother has only",
    "half as many brothers as sisters. How many brothers or sisters",
    "Are there in the family.",
    "(Answer any one of them Eg. 10bro or 1sis)?"
  ],
  [
    "Spelled forwards I'm what you do everyday,",
    "I'm something you hate. What am I"
  ],
  [
    "There was a murder in a house and detective interrogated 4 suspects. Mia said she was",
    "in the kitchen for two hours.Jane said she was painting. Jennifer said she was swimming",
    "in the pool for 3 hours. John was reading a book in the garden all day. The detective looked at everyone's",
    "hands. Mia's hands were oily, jane's hands were covered in paint but jennifer's and john's were perfectly normal.",
    "Help the detective identify the killer"
  ],
  [
    "1 1 2 3 5 ? 9",
    "Find the missing number"
  ]
];

const locations=["password","4sis","live","jennifer","4"];
//jennifer bcoz her hands were not wrinkled even after swimming for 3 hours
//1, (2-1), 2, (5-2), 5, (9-5), 9

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const individual = {
  name: String,
  phone:String,
  email:String,
  roll: String,
  year:String
};

const userSchema = new mongoose.Schema({
  teamName:{type:String,required:true},
  password:{type:String,required:true},
  teamMember1:{type:individual,required:true},
  location:Number,
  time:[{type:Date}]
});

const User = mongoose.model("User",userSchema);

app.get("/",(req,res)=>{
  res.render("register");
});

app.get("/login",(req,res)=>
{
 res.render("login");
});

app.get("/adminlogin",(req,res)=>
{
 res.render("adminlogin");
});


app.get("/:no",(req,res)=>{
  res.render("form",{info:req.params.no});
});

app.post("/adminlogin",(req,res)=>{
  const username = req.body.name;
  const password = req.body.password;
  if(username == "admin@elitmus.com" && password == "topsecret"){
    User.find({}, function(err, users){
      res.render("admin",{allPosts:users});
    });
  }
});

app.post("/login",(req,res)=>{
  const username = req.body.name;
  const password = req.body.password;
  User.findOne({teamName:username,password:password},(err,result)=>
  {
    //console.log(result);
    if(!err && result && !complete(result))
    {
      if(result)
      {
        
        res.render("test",{title:"Clue",array:raste[result.location]});
      }
      else
      {
        res.render("clue",{title:"Please Try again with correct credentials"});
      }
    }
    else if(result && complete(result))
    {
      res.render("clue",{title:"Your team has already completed the Hunt!",info:""})
    }
    else
    {
      res.send("error");
    }
  });
});

app.post("/register",function(req,res){
    const teamMember1 = {
      name:req.body.teamMember1Name,
      phone:req.body.teamMember1Phone,
      email:req.body.teamMember1Email,
      roll:req.body.teamMember1Roll,
      year:req.body.teamMember1Year
    };
    var date = new Date();
      const tempUser=new User({
        teamName:req.body.teamName.trim(),
        password:req.body.password.trim(),
        teamMember1:teamMember1,
        location:0,
        time:[]
      });
    
      User.findOne({teamName:req.body.teamName},(err,result)=>
      {
        if(!err)
        {
          if(result)
          {
            res.render("clue",{title:"Team Name Already Exists",info:"You are requested to try another name for registration."});
          }
          else
          {
            tempUser.time.push(date);
            tempUser.save((err)=>
            {
              if(!err) 
              {
                //console.log("Success");
                res.render("clueLogin",{title:"Registration Successful",info:""});
              }
              else res.render("error");
            });
          }
        }
        else
        {
          res.render("error");
        }
      });

});

app.post("/:number",(req,res)=>
{  
  var date = new Date();
  //date = date.toTimeString(); 

  // console.log(req.params);
  User.findOne({teamName:req.body.name},(err,result)=>
    {
      if(result != null) {
      //console.log(result);
      const placenumber = (req.params.number); 
      if(!err && !complete(result))
      {
        
        if(locations[result.location]==placenumber)
        {
          if(result.location === 4){
            res.render("clue",{title:"The Hunt Has Succeeded !!",info:""})
          }else {
            res.render("test",{title:"Clue",array:raste[result.location+1]});
        }
       
          result.location+=1;
          result.time.push(date);
          result.save();
          
        }
        else if(result.location==1 && placenumber=="3bro"){
          res.render("test",{title:"Clue",array:raste[result.location+1]});
          result.location+=1;
          result.time.push(date);
          result.save();
        }
        else{  
          res.render("backToClue",{title:"Wrong Answer!!"});
        }
      }
      else if(complete(result))
       res.render("clue",{title:"The Hunt Is Over",info:""});
      else
        res.send("error");
    }
    else{
      res.render("clue",{title:"No such team Exists⚠️",info:""});
    }
    }); 
    
});


app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("Server Started at 3000");
});
