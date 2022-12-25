const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }]);

module.exports = {
    cpUpload
};