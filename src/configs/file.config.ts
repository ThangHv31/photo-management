import { diskStorage } from 'multer';

export const storageAvatarConfig = diskStorage({
    destination: './uploads/avatar',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
