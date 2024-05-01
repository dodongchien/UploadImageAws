const Item = require("../models/imageModel");
const { uploadToS3, getSignedUrls } = require("../helpers/awsHelpers");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const imagesServices = require("../services/imageServices");

// mongodb
exports.createItem = async (req, res) => {
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
    console.log("aaaa");
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

//mysql
exports.createImageMysql = async (req, res) => {
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
    const item = await imagesServices.create({ images });
    console.log("aaa");
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
};

exports.getImage = async (req, res) => {
  try {
    const data = await imagesServices.findAll();
    if (!data) {
      return res.status(400).json({
        status: 400,
        message: "Get Image failed",
      });
    }
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

exports.getImageId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status: 404, message: "Nod found" });
    }
    const data = await imagesServices.findOne(id);
    if (!data) {
      return res.status(400).json({
        status: 400,
        message: "Get Image failed",
      });
    }
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
