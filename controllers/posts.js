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
    const stream = streamifier.createReadStream(req.file.buffer);
    const uploadPromise = new Promise((resolve, reject) => {
        const streamUploader = cloudinary.uploader.upload_stream({
            resource_type: 'video',
            quality: 'auto:eco',
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            folder: 'FormFriend/vidUploads',
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        stream.pipe(streamUploader);
    });

    uploadPromise
        .then(async (result) => {
            try {
                await Post.create({
                    title: req.body.title,
                    video: result.secure_url,
                    cloudinaryId: result.public_id,
                    caption: req.body.caption,
                    liftCategory: req.body.liftCategory,
                    user: req.user.id,
                });
                console.log('Post has been added!');
                res.redirect('/profile');
            } catch (err) {
                console.log(err);
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    
  // createPost: async (req, res) => {
    
  //   const stream = streamifier.createReadStream(req.file.buffer)
  //   const streamUploader = cloudinary.uploader.upload_stream({
  //   resource_type: 'video',
  //   quality: 'auto:eco',
  //   use_filename: true,
  //   unique_filename: true,
  //   overwrite: false,
  //   folder: 'FormFriend/vidUploads',
  //   });
    
  //   streamUploader.on('finish', async () => {
     
  //     try {
  //       await Post.create({
  //         title: req.body.title,
  //         video: streamUploader.secure_url,
  //         cloudinaryId: streamUploader.public_id,
  //         caption: req.body.caption,
  //         likes: 0,
  //         liftCategory: req.body.liftCategory,
  //         user: req.user.id,
  //       });

  //       console.log('Post has been added!');
  //       res.redirect('/profile');

  //     } catch (err) {
  //         console.log(err);
  //     }
  //   });
    
  //   stream.pipe(streamUploader);
  //   },

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
