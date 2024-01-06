const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) =>
  res.send(commentsByPostId[req.params.id] || [])
);

app.post("/posts/:id/comments", (req, res) => {
  const id = Math.floor(Math.random() * 10000000000000000).toString();
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id,
    content,
  });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(4001, () => console.log("listening on 4001!"));
