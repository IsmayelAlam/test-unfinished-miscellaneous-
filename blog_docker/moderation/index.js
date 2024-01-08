const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "commentCreated") {
    const status = data.content.includes("test") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data: { ...data, status },
    });
  }

  res.send({ status: "Ok" });
});

app.listen(4003, () => console.log("query services listening on 4003!"));
