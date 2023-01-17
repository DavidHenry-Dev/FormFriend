const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

/* MULTER MEMORY STORAGE */

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;


/*MULTER w/ Multer-Storage-Cloudinary package */

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//   folder: 'FormFriend/vidUploads',
//   format: async (req, file) => 'mp4', 
//   resource_type: 'video',
//   },
//   fileFilter: (req, file, cb) => {
//   if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
//   cb(null, true);
//   } else {
//   cb(new Error('File type is not supported'), false);
//   }
//   },
//   });
  
//   const upload = multer({ storage });
  

  
  /*MULTER DISKSTORAGE*/

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
