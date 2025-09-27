const express = require("express");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

function getDate() {
  return moment().format("YYYY/MM/DD HH:mm:ss");
}

function getCurrentWeekday() {
  return moment().format("dddd");
}

app.get("/timestamp", (req, res) => {
  res.json({
    timestamp: getDate(),
    weekday: getCurrentWeekday(),
  });
});

app.get("/posts", (req, res) => {
  const filePath = path.join(__dirname, "posts.json");

    let posts;
    try {
      posts = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "error" });
    }

    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const take = req.query.take ? Number(req.query.take) : null;

    if ((req.query.skip && !Number.isInteger(skip)) || (req.query.take && !Number.isInteger(take))) {
      return res.status(400).json({ error: "skip и take должны быть числами" });
    }

    let result = posts;

    if (skip > 0) {
      result = result.slice(skip);
    }
    if (take !== null) {
      result = result.slice(0, take);
    }

    res.json(result);
  });


app.get("/posts/:id", (req, res) => {
  const filePath = path.join(__dirname, "posts.json");

    let posts;
    try {
      posts = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "error" });
    }

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "ID должен быть числом" });
    }

    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ error: "Пост не найден" });
    }

    res.json(post);
  });


app.listen(PORT, () => {
  console.log(`Сервер запущен`);
});