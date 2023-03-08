const express = require("express");
const { createPost, getPost,unbookMed, updatePost, deletePost,  getmyPosts, getPosts, bookMed } = require("../Controllers/PostController");

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
 router.get("/:id/myposts", getmyPosts);
 router.put("/book/:id", bookMed);
 router.put("/unbook/:id", unbookMed);


module.exports = router;