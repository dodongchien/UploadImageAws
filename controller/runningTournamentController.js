const { uploadToS3, getSignedUrls } = require("../helpers/awsHelpers");
const runningServices = require("../services/runningTournamentService");

exports.getRunningTournament = async (req, res) => {
  try {
    const data = await runningServices.getAll();
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "not found",
      });
    }
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

exports.createRunningTournament = async (req, res) => {
  try {
    const { name, images, startDate, endDate } = req.body;
    const fileData = req.file;
    if (!name || (!images && !fileData) || !startDate || !endDate) {
      return res
        .status(400)
        .json({ status: 400, message: "Fields cannot be left blank" });
    }

    let imageUrl = "";
    if (fileData) {
      const result = await uploadToS3(fileData.buffer);
      if (!result || !result.Key) {
        return res
          .status(400)
          .json({ status: 400, message: "Upload file to S3 failed" });
      }
      const imageKey = result.Key;
      imageUrl = await getSignedUrls(imageKey);
    } else if (images) {
      imageUrl = images;
    }

    const newRunning = { name, images: imageUrl, startDate, endDate };
    const addData = await runningServices.create(newRunning);
    if (!addData) {
      return res
        .status(400)
        .json({ status: 400, message: "Error connecting to the database" });
    }

    return res.status(201).json({ status: 201, data: addData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
