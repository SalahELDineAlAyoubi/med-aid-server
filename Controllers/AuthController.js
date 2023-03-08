const UserModel = require("../Models/userModel.js");
const bcrypt = require("bcrypt"); 
const jwt  = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
 
const newUser = new UserModel(req.body);
const {email} =req.body;
const oldUser = await UserModel.findOne({ email });
if(oldUser) {

      return res.status(400).json({ message: "User already exists" });

}
  try {
    const user= await newUser.save();
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login User

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if(!validity){
        res.status(400).json("Wrong password")
      }else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" } 
        );
        res.status(200).json({ user, token });
       
    }
         
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
