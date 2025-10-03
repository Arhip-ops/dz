const express = require("express");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

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

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Помилка при читанні файлу постів" });

    let posts;
    try {
      posts = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Помилка парсингу JSON" });
    }

    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const take = req.query.take ? Number(req.query.take) : null;

    // якщо skip або take не є цілими числами
    if ((req.query.skip && !Number.isInteger(skip)) || (req.query.take && !Number.isInteger(take))) {
      return res.status(400).json({ error: "skip і take повинні бути числами" });
    }

    let result = posts;
    // якщо є skip — пропускаємо перші N постів
    if (skip > 0) result = result.slice(skip);
    // якщо є take — беремо тільки N постів
    if (take !== null) result = result.slice(0, take);

    res.json(result);
  });
});

app.get("/posts/:id", (req, res) => {
  const filePath = path.join(__dirname, "posts.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Помилка при читанні файлу постів" });

    let posts;
    try {
      posts = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Помилка парсингу JSON" });
    }

    const id = Number(req.params.id);
    // якщо ID не число
    if (!Number.isInteger(id)) return res.status(400).json({ error: "ID має бути числом" });

    const post = posts.find(p => p.id === id);
    // якщо пост не знайдено
    if (!post) return res.status(404).json({ error: "Пост не знайдено" });

    res.json(post);
  });
});

app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Помилка при читанні файлу користувачів" });

    let users;
    try {
      users = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Помилка парсингу JSON" });
    }

    res.json(users);
  });
});

app.get("/users/:id", (req, res) => {
  const filePath = path.join(__dirname, "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Помилка при читанні файлу користувачів" });

    let users;
    try {
      users = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Помилка парсингу JSON" });
    }

    const id = Number(req.params.id);
    // якщо ID не число
    if (!Number.isInteger(id)) return res.status(400).json({ error: "ID має бути числом" });

    const user = users.find(u => u.id === id);
    // якщо користувача не знайдено
    if (!user) return res.status(404).json({ error: "Користувача не знайдено" });

    if (req.query.fields) {
      const fields = req.query.fields.split(",");
      const filteredUser = {};

      fields.forEach(field => {
        if (user[field] !== undefined) {
          filteredUser[field] = user[field];
        }
      });

      return res.json(filteredUser);
    }

    res.json(user);
  });
});

app.get("/users/name/:name", (req, res) => {
  const filePath = path.join(__dirname, "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Помилка при читанні файлу користувачів" });

    let users;
    try {
      users = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Помилка парсингу JSON" });
    }

    const name = req.params.name.toLowerCase();
    const matchedUsers = users.filter(u => u.name.toLowerCase() === name);

    // якщо жодного користувача з таким ім’ям немає
    if (matchedUsers.length === 0) {
      return res.status(404).json({ error: "Користувачів з таким ім’ям не знайдено" });
    }

    res.json(matchedUsers);
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});
