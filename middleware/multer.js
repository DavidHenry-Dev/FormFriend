const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require("path");

const maxSize = 10 * 1024 * 1024

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'FormFriend/vidUploads',
    allowedFormats: ['mp4', 'MOV'],
})

const upload = multer({ storage: storage, limits: { fileSize: maxSize} });

module.exports = upload;


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
