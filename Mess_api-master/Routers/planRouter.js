const express = require("express");
const planRouter = express.Router();
const {
  protectRoute,
  isAuthorised,
} = require("../controller/authcontroller.js");
const {
  getAllplan,
  getplan,
  createplan,
  updateplan,
  deleteplan,
  top3plan,
} = require("../controller/plancontroller.js");

planRouter
.route("/allplan")
.get(getAllplan);

// plan owner -> logedin necessary
planRouter.use(protectRoute);
planRouter
.route("/plan/:id")
.get(getplan);

//only for owner and resturant-owner
planRouter.use(isAuthorised(["admin", "resturant-owner"]));
planRouter
.route("/create")
.post(createplan);

planRouter
.route("/data/:id")
.patch(updateplan)
.delete(deleteplan);

planRouter
.route("/top3")
.get(top3plan);

module.exports = planRouter;
