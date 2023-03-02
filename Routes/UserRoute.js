const express = require("express");
const { getUser, updateUser, deleteUser, getUsers  } = require("../Controllers/UserController");

const router = express.Router();

  router.get("/:id", getUser);
  router.get("/", getUsers);
  router.put("/:id", updateUser);
  /*router.delete("/:id", deleteUser);*/
 

module.exports = router;