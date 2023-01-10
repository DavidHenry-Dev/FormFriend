const multer = require('multer');
const path = require('path');

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
//   limits: {
//     fieldSize: '50mb'
//  }
// });

module.exports = multer({
  storage: videoStorage,
  limits: {
  fileSize: 50000000 // 10000000 Bytes = 50 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|MOV)$/)) { 
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
})
