const user_model = require("../models/usermodel.js");

module.exports.getuser = async function getuser(req, res) {
  try {
    let id = req.id;
    let user = await user_model.findById(id);
    if (user) {
      res.send(user);
    } else {
      res.json({
        message: "Invalid User Id",
      });
    }
  } catch (err) {
    res.json({
      message: "user not found",
    });
  }
};

module.exports.getAlluser = async function getAlluser(req, res) {
  let all_user = await user_model.find();
  if(all_user) {
    res.json({
      message: "list of all user",
      data: all_user,
    });
  }
};

module.exports.updateuser = async function updateuser(req, res) {
  try {
    let id = req.params.id;
    let datatobeupdated = req.body;
    // console.log('id', id);
    let user = await user_model.findByIdAndUpdate(id, datatobeupdated);
    // let password = user.password;
    // let confirm_password = password;
    // await user.save();
    if (user) {
      res.json({
            message: "data updated successfuly",
            data: id,
          });
    }else{
        res.json({
          message: "user not found",
        });
      }
    // their is a problem on saving the user after update
    
    // if (user) {
    //   const keys= [];
    //   for (let key in datatobeupdated) {
    //     keys.push(key);
    //   }
    //   for (let i = 0; i < keys.length; i++) {
    //     user[keys[i]] = datatobeupdated[keys[i]];
    //   }
    //   let updatedData = await user.save();
    //   res.json({
    //     message: "data updated successfuly",
    //     data: user,
    //   });
    // }else{
    //   res.json({
    //     message: "user not found",
    //   });
    // }
  } catch (err) {
    res.json({
      message: err.message
      // message: "update failed"
    });
  }
};

module.exports.deleteuser = async function deleteuser(req, res) {
  try {
    let id = req.params.id;
    let user = await user_model.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
        // data: user,
      });
    } else {
      res.json({
        message: "data deleted successfuly",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateProfileImage = function updateProfileImage(req,res){
  res.json({
    message:"file upload sucessfully"
  });
};

// function setcookies(req, res) {
//     // res.setHeader('set-Cookies','isLoogedIn'=true);
//     res.cookie("isLoogedIn", true, {
//       maxAge: 1000 * 60 * 60,
//       secure: true,
//       httpOnly: true,
//     });
//     res.cookie("isPrimeMember", true);
//     res.send("cookies has been set");
//   }

// function getcookies(req, res) {
//     let Cookies = req.cookies;
//     console.log(Cookies);
//     res.send("cookies received");
//   }
