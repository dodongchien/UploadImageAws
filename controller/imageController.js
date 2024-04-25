const Item = require("../model/imageModel");
const multer = require("multer");
const { uploadToS3, getSignedUrls } = require("../helpers/awsHelpers");

const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const multerConfig = {
  limits: 1024 * 1024,
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      done(null, true);
    } else {
      done("Niewłaściwy plik, użyj .jpg .jpeg .png", false);
    }
  },
};
const upload = multer(multerConfig);

exports.createItem = async (req, res) => {
  upload.array("images", null)(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }

    try {
      const images = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadToS3(file.buffer);
          if (!result || !result.Key) {
            return res.status(400).json({
              status: 400,
              message: "Upload file to S3 failed",
            });
          }
          const imageKey = result.Key;
          const imageUrl = await getSignedUrls(imageKey);
          images.push(imageUrl);
        }
      }

      const item = await Item.create({ images });
      if (!item) {
        return res.status(400).json({
          status: 400,
          message: "Add Item failed",
        });
      }

      return res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  });
};

exports.getData = async (req, res) => {
  try {
    const dataImage = await Item.find();
    if (!dataImage) {
      res.status(404).json({ status: 404, message: "Not Found" });
    }
    res.status(200).json({ status: 200, data: dataImage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

exports.createImage = async (req, res) => {
  try {
    const { fileNames } = req.body;

    const client = new S3Client({ region: process.env.S3_REGION });

    const presignedUrls = [];
    for (const fileName of fileNames) {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
      });

      const presignedUrl = await getSignedUrl(client, command, {
        expiresIn: 60,
      });
      presignedUrls.push(presignedUrl);
    }

    return res.status(200).json({
      status: 200,
      message: presignedUrls,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
