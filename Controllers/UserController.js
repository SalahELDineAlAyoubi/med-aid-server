const UserModel = require("../Models/userModel.js");
 const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//get a User

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUser  = async(req,res) => { 

const id  = req.params.id; 
 try {
   const user = await UserModel.findById(id);
 
   if (user) {
     const { password, ...otherDetails } = user._doc; //...otherDetail :send all without password

     res.status(200).json(otherDetails);
   } else {
     res.status(404).json("No such user exists");
   }
 } catch (error) {
   res.status(500).json(error);
 }
}

// update a user
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const {_id , password } = req.body;

  if (id === _id ) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        //if seting password in the body
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};


 