var express = require("express");
var router = express.Router();

const Members = require("../Schemas/members.schema");

 
router.get("/", async function (req, res, next) {
  const members = await Members.find({ isVisible: true });

  res.send(members);
});





 
router.post("/", async function (req, res, next) {
  const { name, email, password, phone } = req.body;

  ///Check if user exist
let error = false 
  const member = await Members.findOne({
    name,
  });
  if (member)
  {
    error = true;
    res.send({ msg: "User already registred" , exist: true });
    
  } 

if (!error){
  const newMember = await Members.create({
    name,
    email,
    password,
    phone,
    createdAt: new Date(),
  });
  res.send(newMember);
 
}
}); 
 
 router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
 
  const member = await Members.findOne({
    email,
    password,
  });
  if (member) res.send({ state: "done",ok : true ,_id : member._id ,name :member.name, phone :member.phone,email:member.email ,password:member.password });
  else res.send({ state: "Eroor data", ok: false });
});
 
 
router.put("/", async function (req, res, next) {
  const { name,email, password, phone, _id } = req.body;  
  const updatedMember = await Members.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      password,
      phone,
      
    },
    { new: true }
  );
  res.send(updatedMember);
});  
 
router.delete("/", async function (req, res, next) {
  const { _id } = req.body;  
  const deletedMember = await Members.findByIdAndUpdate(
    _id,
    {
      isVisible: false,
    },
    { new: true }  
  );
  res.send(deletedMember);
});
 
module.exports = router;
