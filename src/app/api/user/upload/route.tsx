import cloudinary from "cloudinary";
import streamifier from "streamifier";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  url: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const image = data.get("file");

    if (!image || !(image instanceof Blob)) {
      return new Response(JSON.stringify({ message: "No image uploaded" }), {
        status: 400,
      });
    }

    console.log("image---->", image);

    // Convert Blob to Readable Stream
    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadFromBuffer = (
      buffer: Buffer
    ): Promise<CloudinaryUploadResult> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryUploadResult);
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const { secure_url } = await uploadFromBuffer(buffer);

    return new Response(
      JSON.stringify({
        message: "File uploaded successfully",
        url: secure_url,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "File not uploaded" }), {
      status: 500,
    });
  }
}
