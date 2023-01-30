const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Salah:CuerHoZ9GPfu2qaG@cluster0.stpnvrm.mongodb.net/test",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("we're connected!");
});
