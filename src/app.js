
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const forcast = require("./tools/forcast");
const geocast = require("./tools/forcastmap");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
   img: "images/logo.png",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ erroe: "Location is missing" });
  }
  geocast(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forcast(data[1], data[0], (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ location: req.query.address, data });
    });
  });
});

app.listen(port, () => {
  console.log("server is runing");
});
