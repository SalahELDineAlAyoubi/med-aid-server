 const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
 mongoose.set("strictQuery", true);
const app = express();

//to serve images for public
   app.use(express.static("public"));
   app.use("/images", express.static("images"));


  // Middleware 
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
   app.use(cors());
 dotenv.config(); 


  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));  

    const port = process.env.PORT || 4000;
    app.listen(port, console.log(`Server running on port ${port}`)); 


 //Routes
  const AuthRoute = require("./Routes/AuthRoute.js"); 
  const UserRoute = require("./Routes/UserRoute.js"); 
  const PostRoute = require("./Routes/PostRoute.js"); 
  const UploadRoute = require("./Routes/UploadRoute.js"); 

    // Usage of Routes

  app.use('/auth',AuthRoute)
  app.use('/user',UserRoute)
    app.use("/posts", PostRoute);
  app.use("/upload", UploadRoute);