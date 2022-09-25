const multer = require('multer')
const path = require('path')

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
      cb(null, true)
    } else {
      cb(new Error('File type is not supported'), false)
      return
    }
  },
})
