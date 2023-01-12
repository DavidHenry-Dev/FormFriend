const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const storage = require('multer-storage-cloudinary');

const upload =  multer({
  storage: storage({  
    cloudinary: cloudinary,
    folder: 'FormFriend/vidUploads',
    allowedFormats: ['mp4', 'MOV'],
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
 }),
});

module.exports = upload
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
