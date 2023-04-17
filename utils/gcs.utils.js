import multer from "multer";
import {Storage} from "@google-cloud/storage";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: JSON.parse(process.env.GCS_KEY_FILE),
});

const upload = multer({storage: multer.memoryStorage()});

// to optimize => might have to get name of image from database to delete (if same name, different ext)
export const uploadImage = async (
  file,
  bucketName,
  subfolderName,
  filename
) => {
  if (filename && filename !== file.originalname) {
    filename = filename + path.extname(file.originalname);
  }
  if (!filename) {
    filename = `${subfolderName}/${Date.now()}-${file.originalname}`;
  }

  const bucket = storage.bucket(bucketName);
  try {
    const imageName = filename;
    const imageBuffer = file.buffer;

    const blob = bucket.file(imageName);
    const stream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      stream.on("error", (err) => {
        console.error(err);
        reject(err);
      });

      stream.on("finish", async () => {
        resolve(imageName);
      });

      stream.end(imageBuffer);
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getImageUrl = async (bucketName, subfolderName, imageName) => {
  if (
    bucketName === process.env.GCS_PROFILE_BUCKET &&
    imageName.startsWith("https://lh3.googleusercontent.com")
  ) {
    return imageName;
  }
  const bucket = storage.bucket(bucketName);
  let file;
  if (!subfolderName) {
    file = bucket.file(imageName);
  } else {
    file = bucket.file(`${subfolderName}/${imageName}`);
  }

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
  });

  return url;
};

export const deleteImage = async (bucketName, subfolderName, imageName) => {
  const bucket = storage.bucket(bucketName);
  let file;
  if (!subfolderName) {
    file = bucket.file(imageName);
  } else {
    file = bucket.file(`${subfolderName}/${imageName}`);
  }

  try {
    await file.delete();
    console.log(`File ${imageName} deleted successfully.`);
  } catch (err) {
    console.error(`Error deleting file ${imageName}:`, err);
    throw err;
  }
};
