const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: [],
        post: req.params.id,
        user: req.user.id,
      });
      console.log('Comment has been added!');
      res.redirect('/post/' + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // let comment = await Post.findById({ _id: req.params.id });
      await Comment.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect(`/post/${req.params.postid}`);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate({ _id: req.params.commentid }, { $addToSet: { likes: req.user.id } });
      console.log('Likes +1');
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },
  dislikeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $pull: { likes: req.user.id },
        }
      );
      console.log('Likes -1');
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },
};
