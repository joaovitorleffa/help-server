import path = require('path');
import { diskStorage } from 'multer';

const storage = {
  storage: diskStorage({
    destination: './uploads/organization/images',
    filename: (req, file, cb) => {
      const date = new Date();
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        '-' +
        date.toISOString();
      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export { storage };
