import path = require('path');
import { diskStorage } from 'multer';

const editFileName = (req, file, cb) => {
  console.log('editFileName', file);
  const date = new Date();
  const fileNameTrim = file.originalname.trim();
  const fileName =
    path.parse(fileNameTrim).name.replace(/\s/g, '') + '-' + date.toISOString();
  const extension = path.parse(fileNameTrim).ext;
  cb(null, `${fileName}${extension}`);
};

const storage = {
  storage: diskStorage({
    destination: './uploads/organization/images',
    filename: (req, file, cb) => editFileName(req, file, cb),
  }),
};

const causeStorage = {
  storage: diskStorage({
    destination: './uploads/causes/feedback',
    filename: editFileName,
  }),
};

export { storage, causeStorage };
