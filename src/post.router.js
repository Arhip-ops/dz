const express = require("express");
const postController = require("./post.controller");

const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.post("/", postController.createPost);

module.exports = router;
