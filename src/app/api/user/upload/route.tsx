import fs from "fs-extra";
import multer from "multer";
import cloudinary from "cloudinary";
import { nextConnect } from "next-connect";

cloudinary.config({
  cloud_name: "dnzgzlxxy",
  api_key: "731957682875596",
  api_secret: "DqETxXSmCfkIwd23LBmfAaR-hhw",
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images/"); // Folder for temporary storage
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Initialize Next.js API route handler
const handler = nextConnect();

// Middleware to handle file upload
handler.use(upload.single("file"));

// POST request handler
handler.post(async (req, res) => {
  try {
    // Process uploaded files in the "Images/" folder
    const files = fs.readdirSync("Images/");
    for (const file of files) {
      await cloudinary.v2.uploader.upload(
        `Images/${file}`,
        {},
        (error, result) => {
          if (error) {
            return res.status(400).json({ message: "Invalid data", error });
          }

          // Remove file from the local filesystem after upload
          fs.remove(`Images/${file}`, (err) => {
            if (err) console.error("Error removing file:", err);
          });

          // Respond with the uploaded file URL
          res.status(200).json({ message: "File uploaded", url: result?.url });
        }
      );
    }
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({ message: "File not uploaded", error: err?.message });
  }
});

// Disable body parsing by Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
