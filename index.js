import express from 'express';
import cors from 'cors';
import * as utils from './utils/utils.js'
var app = express();
app.use(cors());
app.use(express.json());
utils.connectDB();


app.post("/adventure/start", (req, res) => {
  const adventure= utils.newAdventure();
});

// app.get("/adventure/:adventure_id"){



app.listen(8080, () => {
  console.log("Server listening on 8080");
});
