import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/tmp/uploads');
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export const upload = multer({ storage });
