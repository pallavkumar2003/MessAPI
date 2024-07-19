const user_model = require("../models/usermodel.js");
const plan_model = require("../models/planmodel.js");
const {sendMail} = require("../utility/nodemailer.js")
const jwt = require("jsonwebtoken");
// const jwt_key = require("/home/sourabh/Desktop/vs code/Backend_Practice/Food-app/secret.js");
const jwt_key = 'avbiuehvoiwhefvyaw';

// sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let dataobj = req.body;
    let user = await user_model.create(dataobj);
    sendMail("signup",user);
    // console.log("backend", user);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "invalid user details",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// log in user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    // console.log(data.email);
    if (data.email) {
      let user = await user_model.findOne({ email: data.email });
      // console.log(user.email);
      if (user) {
        if (user.password == data.password) {
          let uid = user['_id'];
          let token = jwt.sign({ payload: uid }, jwt_key);
          res.cookie('login', token, { httpOnly: true });
          return res.json({
            message: "User logged-in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong password",
          });
        }
      } else {
        return res.json({
          message: "Invalid user",
        });
      }
    } else {
      return res.json({
        message: "Please enter an Email!!",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//is authoriser -> to verify users role[]
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      return res.status(401).json({
        message: "unAuthorised access",
      });
    }
  };
};

//protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
  let token;
  try {
    if (req.cookies.login) {
      token = req.cookies.login;
      // console.log('token',token);
      let payload = jwt.verify(token, jwt_key);
      if (payload) {
        const user = await user_model.findById(payload.payload);
        // console.log('payload',payload);
        req.role = user.role;
        req.id = user.id;
        // console.log('id', id);
        // console.log('role', req.role);
        next();
      } else {
        return res.json({
          message: "user not verified",
        });
      }
    } else {
      const client = req.get('User-Agent');
      if (client.includes("Mozilla")==true) {
          return res.redirect('/login')
      }
      return res.json({
        message: "Please logIn!!",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// forgetpassword
module.exports.forgetpassword = async function forgetpassword(req,res) {
  let{email} = req.body;
  try {
    const user = await user_model.findOne({email:email});
    if (user) {
      const resetToken = user.createResetToken();
      // http://abc.com/resetpasswore/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassord/${resetToken}`;
      //send mail to the user by using nodemailer
      let obj ={
        resetPasswordLink : resetPasswordLink,
        email : email
      }
      sendMail("resetpassword",obj);
    }
  } catch (err) {
    res.status(500).josn({
      message: err.message
    })
  }
}

//resetToken
module.exports.resetpassword = async function resetpassword(req, res){
  try {
  const token = req.parmas.token;
  let {password, confirmPassword} = req.body;
  const user = await user_model.findOne({resetToken:token})
  if (user) {
    user.resetPasswordHandler(password,confirmPassword)
    await user.save()
    res.json({
      message:"password reset successfully"
    })
  }else{
    res.json({
      message:"user not found"
    });
  }
  } catch (err) {
    res.json({
      message:err.message
    });
  }
}

module.exports.logout=function logout(req,res) {
  res.cookie('login',' ',{maxAge:1});
  res.json({
    message:"user logged out succefully"
  })
}