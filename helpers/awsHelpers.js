const AWS = require("aws-sdk");

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
};
const S3 = new AWS.S3(awsConfig);

const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${Date.now().toString()}.jpg`,
      Body: fileData,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      return resolve(data);
    });
  });
};

const getSignedUrls = async (key) => {
  const extension = key.split(".").pop().toLowerCase();
  let contentType, filename;

  switch (extension) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      filename = "image.jpg";
      break;
    case "png":
      contentType = "image/png";
      filename = "image.png";
      break;
    default:
      throw new Error("Loại tệp không hỗ trợ");
  }

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: null,
    ResponseContentType: contentType,
    ResponseContentDisposition: `inline; filename="${filename}"`,
  };

  const url = await S3.getSignedUrlPromise("getObject", params);
  return url;
};

module.exports = {
  uploadToS3,
  getSignedUrls,
  S3,
};
