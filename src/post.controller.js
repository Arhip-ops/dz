const postService = require("./post.service");

const postController = {
  async getAllPosts(req, res) {
    try {
      const { skip, take } = req.query;
      const result = await postService.getAllPosts(skip, take);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Помилка при отриманні постів" });
    }
  },

  async getPostById(req, res) {
    try {
      const id = Number(req.params.id);
      // якщо ID не число
      if (isNaN(id)) return res.status(400).json({ error: "ID має бути числом" });

      const post = await postService.getPostById(id);
      // якщо пост не знайдено
      if (!post) return res.status(404).json({ error: "Пост не знайдено" });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Помилка при отриманні поста" });
    }
  },

  async createPost(req, res) {
    try {
      const { title, description, image } = req.body;
      // якщо відсутнє поле title, description або image
      if (!title || !description || !image) {
        return res.status(422).json({ error: "title, description і image обов'язкові" });
      }

      const newPost = await postService.createPost({ title, description, image });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Помилка при створенні поста" });
    }
  },
};

module.exports = postController;