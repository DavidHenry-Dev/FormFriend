const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const commentsController = require('../controllers/comments');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Comment Routes - simplified for now

router.post('/createComment/:id', commentsController.createComment);
router.delete('/deleteComment/postid/:commentid', commentsController.deleteComment);
router.delete('/deleteComment/:id', commentsController.deleteComment);
router.put('/likeComment/:postid/:commentid', commentsController.likeComment);
router.put('/dislikeComment/:postid/:commentid', commentsController.dislikeComment);

module.exports = router;
