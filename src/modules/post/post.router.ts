import { Router } from "express";
import { postController } from "./post.controller";

const router: Router = Router();

// GET /posts
router.get("/", postController.getAllPosts);

// GET /posts/:id
router.get("/:id", postController.getPostById);

// POST /posts
router.post("/", postController.createPost);

export default router;
