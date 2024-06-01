export const renameImage = (req, file, cb) => {
  const name = file.originalname.split('.'[0]);
  const fileName = file.originalname;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  cb(null, `${name}-${randomName}${fileName}`);
};

export const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Invalid format type'), false);
  }

  cb(null, true);
};
