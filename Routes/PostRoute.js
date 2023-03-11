const express = require("express");
const {
  createPost,
  savePost,
  getPost,
  unbookMed,
  updatePost,
  deletePost,
  getmyPosts,
  getPosts,
  bookMed,
  searchPosts,
  getBookedPost,
  acceptRequest,
} = require("../Controllers/PostController");

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.get("/", getPosts); 
router.post("/filter", searchPosts);
router.put("/:id", updatePost);
 router.delete("/:id", deletePost);
 router.get("/:id/myposts", getmyPosts);
 router.put("/book/:id", bookMed);
 router.put("/unbook/:id", unbookMed);
 router.put("/accept/:id", acceptRequest);
 router.post("/mybookepost/", getBookedPost);



module.exports = router;