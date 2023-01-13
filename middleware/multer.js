const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
require('dotenv').config({ path: './config/.env' });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: ({  
    folder: 'FormFriend/vidUploads',
    allowedFormats: ['mp4', 'MOV'],
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
 })
});

const parser = multer({ storage: storage });

exports.parser
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
