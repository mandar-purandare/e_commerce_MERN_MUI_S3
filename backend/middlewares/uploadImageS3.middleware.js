
// const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: () => `${process.env.AWS_BUCKET_NAME}`,
//     acl: 'public-read', // Make the uploaded file public
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//   }),
// });

// export default upload


import multer from 'multer';
import multerS3 from 'multer-s3';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import path from "path";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Initialize S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded"); // Debugging log
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("File received:", req.file); // Debugging log

  const fileExt = path.extname(req.file.originalname);
  const fileName = `${uuidv4()}${fileExt}`;
  const fileKey = `uploads/${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey, // 🔹 This is the key S3 will use
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const uploadResult = await s3Client.send(new PutObjectCommand(params));
    console.log("Upload result:", uploadResult); // Debugging log

    req.file.key = fileKey; // ✅ Assign key so it's available in AddProduct
    req.file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Failed to upload image" });
  }
};

export { upload, uploadToS3 }