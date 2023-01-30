const mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const MembersSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  isVisible: { type: Boolean, default: true }, // iza bdi em7i chi f3lyan ma ynma7a bas yt5aba
  createdAt: { type: Date },
});

const population = [];

const Members = mongoose.model("Members", MembersSchema, "Members");
module.exports = Members;
