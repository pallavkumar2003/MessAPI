// const express = require("express");
// const {postsignup, login} = require('../controller/authcontroller.js')
// const authRouter = express.Router();

// // authRouter
// //   .route("/signup")
// //   .get(middleware1, getsignup, middleware2) //path specific middleware
// //   .post(postsignup);

// // authRouter
// //   .route("/login")
// //   .post(login);

// module.exports.middleware1 = function middleware1(req, res, next) {
//     console.log("middleware1 called");
//     next();
//   }
  
// module.exports.middleware2 = function middleware2(req, res) {
//     console.log("middleware2 called");
//     console.log("middleware2 ended req/res cycle");
//     res.sendFile("/index.html", { root: __dirname });
//   }
  
// module.exports.getsignup = function getsignup(req, res, next) {
//     console.log("getsignup callled");
//     next();
//   }
  
// module.exports = authRouter;
