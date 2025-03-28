import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({ region: "us-east-1" });

async function getSignedImageUrl(fileKey) {
    if (!fileKey) return null;
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  });

  return await getSignedUrl(s3, command, { expiresIn: 600 }); // 10 min expiry
}

export default getSignedImageUrl