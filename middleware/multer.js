const multer = require('multer');
const path = require('path');


module.exports = multer({
  storage: multer.diskStorage({}),
  limits: {
    // fieldSize: 15 * 1024 * 1024,
    fileSize: 15000000,
  },
  fileFilter: (req, file, cb) => {

    if (file.size > 15000000) {
      return cb(new Error('File size should be less than 15MB'));
    }
    cb(null, true);

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
