const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require("../middleware/multer-config");

// CRUD post
router.get("/", postCtrl.getPost);
router.post("/", multer, postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

//likes
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unlikePost);

//comments
router.patch("/comment-post/:id", postCtrl.commentPost);
router.patch("/comment-edit/:id", postCtrl.editCommentPost);
router.patch("/comment-delete/:id", postCtrl.deleteCommentPost);

module.exports = router;
