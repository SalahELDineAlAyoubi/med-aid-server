const RequestPostModel = require("../Models/RequestPostModel");
const mongoose = require("mongoose");


exports.createRequest = async (req, res) => {
  const newRequest = new RequestPostModel(req.body);

  try {
    await newRequest.save();
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await RequestPostModel.find({ isVisible: true });
    res.status(200).json(
      requests.sort((a, b) => {
        return b.createdAt - a.createdAt; //latest posts  will apear first
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};