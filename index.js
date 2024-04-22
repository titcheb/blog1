const express = require("express");
const bodyParser = require("body-parser");
var moment = require('moment'); // require
moment().format("MMMM Do YYYY, h:mm:ss a"); 
const path = require("path");
const { name } = require("ejs");
const { setInterval } = require("timers/promises");
const { time } = require("console");

const app = express();
const port = 3000;
let data1 = [];

let loginMsg = "You need to login to post articles";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let loginCheck = false;
let loginbtnvalue1 = "Login";
app.get("/", (req, res) => {
  let loginData = {
    logincheck: loginCheck,
    loginmessage: loginMsg,
    loginbtnvalue: loginbtnvalue1,
  };
  if (loginCheck != false) {
    loginbtnvalue1 = "Logout";
   
    res.render("index.ejs", {
      loginstatus: loginData.logincheck,
      loginmessage: loginData.loginmessage,
      loginbtnvalue: loginData.loginbtnvalue,
      
    });
  } else {
    loginbtnvalue1 = "Login";
    res.redirect("login");
  }
});
let username="astrit";
let password="123456"
let loginfailed="";
app.post("/login",(req,res)=>{
  if(username===req.body.username&&password===req.body.password){
    loginfailed="Logged in successfully!"
    loginbtnvalue1 = "Logout";
    loginCheck=true;
    
    
   }
   else{
    if(req.body.username!==""){
      loginfailed="Login Failed check your username/password!";
      
    }
    
   }
   
      console.log(loginfailed)
    res.redirect("/")
    
   
})
app.get("/login", (req, res) => {
 
  
  res.render("login", { loginbtnvalue: loginbtnvalue1,loginstatus:loginCheck,loginFailed:loginfailed });
});

function removeFromArrayOfHash(p_array_of_hash, p_key, p_value_to_remove) {
  return p_array_of_hash.filter((l_cur_row) => {
    return l_cur_row[p_key] != p_value_to_remove;
  });
}

app.get("/edit", (req, res) => {
  let editData;

  try {
    editData = {
      id: data1[idedit - 1].id,
      name: data1[idedit - 1].name,
      message: data1[idedit - 1].personnummer,
    };
  } catch (error) {
    console.log(error);
  }

  if (data1.length > !-1) {
    res.render("edit", {
      name: editData.name,
      message: editData.message,
      id: editData.id,
      loginstatus:loginCheck
    });
  } else {
    res.redirect("/");
  }
});
app.post("/edit", (req, res) => {
  idedit = parseInt(req.body.edit);
  console.log(req.body.edit, "ID");

  res.redirect("edit");
});

let idedit = 1;
app.post("/post", (req, res) => {
  switch (req.body.choice || req.body.edit || req.body.login) {
    case "Post":
      data1.push({
        id: data1.length + 1,
        name: req.body.arrayDataName,
        date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        personnummer: req.body.arrayDataPersonalNR,
      });

      res.redirect("/posts");

      break;
    case req.body.choice:
      let id = parseInt(req.body.choice);
      data1 = removeFromArrayOfHash(data1, "id", id);

      res.redirect("posts");

      break;
    case "Save":
      data1.splice(idedit - 1, 1, {
        id: idedit,
        name: req.body.arrayDataName,
        date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        personnummer: req.body.arrayDataPersonalNR,
      });
      res.redirect("/posts");
      break;
    case "Back":
      res.redirect("/posts");
      break;
    case "Login":
      
      
      res.redirect("/");
      break;
    case "Logout":
      loginCheck = false;
      loginfailed="";
      res.redirect("/");

      break;
    default:
      break;
  }
});

app.get("/posts", (req, res) => {
  let noData = "No posts to show!";

  const data = data1;

  res.render("posts", {
    dataArray: data,
    nodata: noData,
    loginbtnvalue: loginbtnvalue1,
    loginstatus:loginCheck
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
