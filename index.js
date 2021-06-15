import express from "express";
import cors from "cors";
import * as utils from "./utils/utils.js";
var app = express();
app.use(cors());
app.use(express.json());
utils.connectDB();

app.post("/adventure/start", (req, res) => {
  let result = utils.newAdventure();
  res.sendStatus(200, "adventure and character created");
});

app.get("/adventure/:id", async (req, res) => {
  const { id } = req.params;
  let result = await utils.findAdventureById(id);
  console.log("result from index ", result)
  res.status(200).send(result);
});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});
