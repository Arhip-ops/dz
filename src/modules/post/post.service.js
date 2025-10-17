const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../../../posts.json");

const postService = {
  async getAllPosts(skip, take) {
    const data = await fs.readFile(filePath, "utf8");
    let posts = JSON.parse(data);

    const skipNum = skip ? Number(skip) : 0;
    const takeNum = take ? Number(take) : null;

    // якщо skip або take не числа
    if ((skip && isNaN(skipNum)) || (take && isNaN(takeNum))) {
      throw new Error("skip і take повинні бути числами");
    }

    let result = posts;
    // якщо є skip — пропускаємо перші N постів
    if (skipNum > 0) result = result.slice(skipNum);
    // якщо є take — беремо тільки N постів
    if (takeNum !== null) result = result.slice(0, takeNum);

    return result;
  },

  async getPostById(id) {
    const data = await fs.readFile(filePath, "utf8");
    const posts = JSON.parse(data);
    return posts.find(p => p.id === id);
  },

  async createPost({ title, description, image }) {
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

    return newPost;
  },
};

module.exports = postService;
