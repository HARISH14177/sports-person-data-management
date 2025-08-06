// middleware/upload.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// Accept two fields: photo and aadhar
export const upload = multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadhar', maxCount:1}
]);