const express = require("express");
const bookingRouter = express.Router();
const {protectRoute} = require("../controller/authcontroller");
const {createSession} = require("../controller/bookingcontroler");

bookingRouter.post('/createSession', protectRoute);
bookingRouter.get('/createSession', function (req, res) {
  res.sendFile("/home/sourabh/Desktop/vs code/Backend_Practice/Food-app/booking.html");
});

module.exports = bookingRouter;
