const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

function handleEvent(type, data) {
  if (type === "postCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "commentCreated") {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
  }
  if (type === "commentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => res.send(posts));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "Ok" });
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "Ok" });
});

app.listen(4002, async () => {
  console.log("query services listening on 4002!");

  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      console.log("event started " + event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
