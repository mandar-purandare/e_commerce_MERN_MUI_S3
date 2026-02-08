import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ImageKit, { toFile } from "@imagekit/nodejs";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Initialize ImageKit
const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

const uploadToImageKit = async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded"); // Debugging log
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("File received:", req.file); // Debugging log

  const fileExt = path.extname(req.file.originalname);
  const fileName = `${uuidv4()}${fileExt}`;


  try {
    const response = await client.files.upload({
      file: await toFile(req.file.buffer, "file"),
      fileName: fileName,
    });


    console.log(response);
    req.body.url = response.url
    req.body.fileId = response.fileId

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};

 const deleteFromImageKit = async (req, res, next) => {
  try {
    const result = await client.files.delete(req.params.imageKitFileId);
    console.log("File deleted successfully:", result);

    // You can perform additional actions here, like updating your database
    next()
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}



export { upload, uploadToImageKit, deleteFromImageKit };
