const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');

//Post Routes - simplified for now
router.get('/:id', ensureAuth, postsController.getPost);

router.post('/createPost', upload.single('video'), postsController.createPost);

// router.put('/likePost/:id', postsController.likePost)

router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router;
