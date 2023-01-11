const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.memoryStorage(),
  fieldSize: 50 * 1024 * 1024,
  fileSize: 52428800,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
      cb(null, true);
    } else {
      cb(new Error('File type is not supported'), false);
      return;
    }
  },

});

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
