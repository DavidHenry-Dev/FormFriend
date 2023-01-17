const cloudinary = require('../middleware/cloudinary');
const streamifier = require('streamifier');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 'desc' }).populate('user');
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 'desc' }).populate('user').lean();
      res.render('feed.ejs', { posts: posts, user: req.user, comments: comments, path: req.path });
    } catch (err) {
      console.log(err);
    }
  },
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const comments = await Comment.find({ profile: req.params.id }).sort({ createdAt: 'desc' }).populate('user').lean();
      res.render('profile.ejs', { posts: posts, user: req.user, path: req.path, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 'desc' }).populate('user').lean();
      res.render('post.ejs', {
        post: post,
        user: req.user,
        comments: comments,
        path: req.path,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // convert the file to a buffer using streamifier
      const buffer = await streamifier.createReadStream(req.file.buffer);

      // use multer's memory storage with the buffer
      const file = {
        originalname: req.file.originalname,
        buffer: buffer
      };

      const uploadedFile = await cloudinary.uploader.upload(file.buffer, {
        resource_type: 'video',
        quality: 'auto:eco',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'FormFriend/vidUploads',
      });
      const post = await Post.create({
        title: req.body.title,
        video: uploadedFile.secure_url,
        cloudinaryId: uploadedFile.public_id,
        caption: req.body.caption,
        likes: 0,
        liftCategory: req.body.liftCategory,
        user: req.user.id,
      });
      console.log('Post has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  // createPost: async (req, res) => {
  //   // Upload image to cloudinary
  //   try {
  //     const uploadedFile = await cloudinary.uploader.upload(req.file.buffer, {
  //       resource_type: 'video',
  //       quality: 'auto:eco',
  //       use_filename: true,
  //       unique_filename: false,
  //       overwrite: true,
  //       folder: 'FormFriend/vidUploads',
  //     });
  //     const post = await Post.create({
  //       title: req.body.title,
  //       video: uploadedFile.secure_url,
  //       cloudinaryId: uploadedFile.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       liftCategory: req.body.liftCategory,
  //       user: req.user.id,
  //     });
  //     console.log('Post has been added!');
  //     res.redirect('/profile');
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
