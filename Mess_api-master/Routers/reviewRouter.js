const express = require("express");
const reviewRouter = express.Router();
const {
  protectRoute,
  // isAuthorised,
} = require("../controller/authcontroller.js");
const {
  getAllreview,
  getPlanreview,
  top3review,
  deleteReview,
  createReview,
  updateReview,
} = require("../controller/reviewcontroller.js");

reviewRouter
.route("/all")
.get(getAllreview);

reviewRouter
.route("/top3")
.get(top3review); 

reviewRouter
.route("/:id")
.get(getPlanreview);

reviewRouter.use(protectRoute);
reviewRouter
.route("/crud/:id")
.post(createReview)
.patch(updateReview)
.delete(deleteReview);

// reviewRouter
// .route("/crud/:id")


module.exports = reviewRouter;
