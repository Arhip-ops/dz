const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json()); // для парсингу JSON з тіла запиту

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

app.get("/posts", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "posts.json");
    const data = await fs.readFile(filePath, "utf8");
    let posts = JSON.parse(data);

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
  } catch (error) {
    res.status(500).json({ error: "Помилка при обробці запиту" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "posts.json");
    const data = await fs.readFile(filePath, "utf8");
    const posts = JSON.parse(data);

    const id = Number(req.params.id);
    // якщо ID не число
    if (!Number.isInteger(id)) return res.status(400).json({ error: "ID має бути числом" });

    const post = posts.find(p => p.id === id);
    // якщо пост не знайдено
    if (!post) return res.status(404).json({ error: "Пост не знайдено" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Помилка при обробці запиту" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // якщо відсутнє поле title, description або image
    if (!title || !description || !image) {
      return res.status(422).json({ error: "title, description і image обов'язкові" });
    }

    const filePath = path.join(__dirname, "posts.json");
    const data = await fs.readFile(filePath, "utf8");
    const posts = JSON.parse(data);

    const newPost = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
      title,
      description,
      image,
      likes: 0,
    };

    posts.push(newPost);

    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf8");

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Помилка при створенні поста" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});
