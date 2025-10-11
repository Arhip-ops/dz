import express from "express";
import postRouter from "./post.router";

const app = express();
const PORT = 8000;

app.use(express.json());

// підключаємо роутер постів
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});
