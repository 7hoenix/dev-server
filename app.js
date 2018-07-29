const express = require("express");
var cors = require("cors");
var port = process.env.PORT || 3000;

var app = express();

let lessons = ["8/7k/8/7K/P7/8/8/8 w - - - -"];
let randomSeed = () => {
  return Math.floor(Math.random() * 100);
}

app.use(cors()); // TODO: handle CORS better
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/lesson", (req, res, next) => {
  const fen = req.body.fen;
  const seed = req.body.seed;
  // if (!!fen && !!seed) {
  if (!!fen) {
    const id = lessons.length; // TODO: use UUID
    const newLesson = {
      id: id,
      seed: seed,
      fen: fen
    };
    lessons.push(newLesson);
    res.status(204).send("No Content");
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/lesson", (req, res, next) => {
  const lesson = lessons[lessons.length - 1];
  res.json({"board": lesson.fen});
});

app.get("/api/seed", (req, res, next) => {
  res.json({"seed": randomSeed()});
});

app.listen(port, () => console.log("Listening"));
