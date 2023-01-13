const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const parser = multer({ storage: storage });

//Post Routes - simplified for now
router.get('/:id', ensureAuth, postsController.getPost);

router.post('/createPost', parser.single('video'), postsController.createPost);

// router.put('/likePost/:id', postsController.likePost)

router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router;
