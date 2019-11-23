const express = require("express");
const path = require("path");

const app = express();


// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(express.urlencoded({limit: '50mb', extended: true })); 

app.use(express.json());


app.get("/:id", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
