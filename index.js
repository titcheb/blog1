const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
const port = 3000;
let data1 = [];
var todaymoment;
setInterval(function () {
   todaymoment = moment().format('MMMM Do YYYY, h:mm:ss a');
    
  }, 1000);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});
function removeFromArrayOfHash(p_array_of_hash, p_key, p_value_to_remove) {
  return p_array_of_hash.filter((l_cur_row) => {
    return l_cur_row[p_key] != p_value_to_remove;
  });
}

app.post("/post", (req, res) => {
  switch (req.body.choice) {
    case "post":
      data1.push({
        id: data1.length + 1,
        name: req.body.arrayDataName,
        date: todaymoment,
        personnummer: req.body.arrayDataPersonalNR,
      });
      console.log(data1);
      res.redirect("/posts");
      break;
    case req.body.choice:
      let id = parseInt(req.body.choice);
      data1 = removeFromArrayOfHash(data1, "id", id);

      res.redirect("posts");
      break;

    default:
      break;
  }
});

app.get("/posts", (req, res) => {
  let noData = "No posts to show!";

  const data = data1;

  res.render("posts", { dataArray: data, nodata: noData });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
