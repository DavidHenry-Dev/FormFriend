const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


module.exports = CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'FormFriend/vidUploads',
      format: 'mp4',
      quality: 'auto:eco',
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// const upload = multer({ storage });

// module.exports = upload;


// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
//       cb(null, true);
//     } else {
//       cb(new Error('File type is not supported'), false);
//       return;
//     }
//   },
// });
