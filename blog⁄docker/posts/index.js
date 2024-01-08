const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => res.send(posts));

app.post("/posts", async (req, res) => {
  const id = Math.floor(Math.random() * 10000000000000000).toString();
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "postCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log(req.body.type);

  res.send({ status: "Ok" });
});

app.listen(4000, () => console.log("listening on 4000!"));
