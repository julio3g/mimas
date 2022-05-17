import crypto from 'crypto';
import multer from 'multer';
import path, { resolve } from 'path';
import kebabCase from 'kebab-case';
const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(32).toString('hex');
      const fileOriginalName = file.originalname.replace(/\s/g, '');
      // const fileName = `${fileHash}-${kebabCase(
      //   fileOriginalName.toLowerCase(),
      // )}`;
      const extensionFile = path.extname(fileOriginalName);
      const fileName = `${fileHash}${extensionFile}`;
      return callback(null, fileName);
    },
  }),
};
