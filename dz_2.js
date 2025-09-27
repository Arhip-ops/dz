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
    
  try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch {
      res.status(500).json({ error: "error" });
    }
  });


app.listen(PORT, () => {
  console.log(`Сервер запущен`);
});
