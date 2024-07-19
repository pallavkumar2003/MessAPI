const express = require("express");
const multer = require("multer");
const {
  getAlluser,
  updateuser,
  deleteuser,
  getuser,
  updateProfileImage,
} = require("../controller/usercontroller.js");
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authcontroller.js");
// const { reset } = require("nodemon");
const userRouter = express.Router();

// const app = express();

userRouter
.route("/signup")
.post(signup);

userRouter
.route("/login")
.post(login);

userRouter
.route("/logout")
.get(logout)

//editable function
userRouter
.route("/:id")
.patch(updateuser)
.delete(deleteuser);

//profile pae
// userRouter.use(protectRoute);
// userRouter
// .route("/userprofile")
// .get(getuser);

userRouter
.route("/forgetpassword")
.post(forgetpassword)

userRouter
.route("/resetpassword/:id")
.post(resetpassword)

//multer

const multerstorage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/images');
  },
  filename:function (req,file,cb){
    cb(null, `user-${Date.now()}.jpeg`)
  }
});

const filter = function (req,file,cb) {
  if(file.mimetype.startsWith("image")) {
    cb(null,true)
  }
  else{
    cb(new Error("not an image! please upload an image", false))
  }
}

const upload = multer({
  Storage : multerstorage,
  fileFilter : filter 
})

userRouter.post('/ProfileImage', upload.single('photo'), updateProfileImage);
//get request
userRouter.get('/ProfileImage',function (req, res){ 
  res.sendFile("/home/sourabh/Desktop/vs code/Backend_Practice/Food-app/multer.html");
});
//profile page

userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getuser)


//admin specific funtion
userRouter.use(isAuthorised(['admin']));
userRouter
.route("/")
.get(getAlluser);

// userRouter
//   .route("/getcookies")
//   .get(getcookies);

// userRouter
//   .route("/setcookies")
//   .get(setcookies);

module.exports = userRouter;
