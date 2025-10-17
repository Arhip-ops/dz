const express = require("express");
const path = require("path");
const postRouter = require("./modules/post/post.router");

const app = express();
const PORT = 3000;

app.use(express.json());

// підключаємо роутер постів
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});
