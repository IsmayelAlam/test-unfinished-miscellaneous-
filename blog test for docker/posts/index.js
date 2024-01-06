const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => res.send(posts));

app.post("/posts", (req, res) => {
  const id = Math.floor(Math.random() * 10000000000000000).toString();
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log("listening on 4000!"));