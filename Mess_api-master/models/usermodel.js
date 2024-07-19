const mongoose = require("mongoose");
const emailvalidator = require("email-validator"); //it is used to check wether you enter a valid string or not according to your logic
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { log } = require("console");

//connect mongoose (user schema and model)
const db_link =
  "mongodb+srv://sourabhsbg01:ltJWMoRRySDEy4gq@cluster0.ysk7s5p.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(db);
    console.log("mongoose connected");
  })
  .catch(function (err) {
    console.log("error1");
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailvalidator.validate(this.email);
    },
  },

  password: {
    type: String,
    required: true,
    min: 8,
  },

  confirm_password: {
    type: String,
    required: true,
    min: 8,
    validate: function () {
      return this.confirm_password == this.password;
    },
  },

  role: {
    type: String,
    enum: ["admin", "user", "owner", "deliveryboy"],
    default: "user",
  },

  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

//hoooks
userSchema.pre("save", function () {
  this.confirm_password = undefined;
});

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandles = function (password, confirmpassword) {
  this.password = password;
  this.confirm_password = confirmpassword;
  this.resetToken = undefined;
};
//to secure the password

// userSchema.pre('save',async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedpassword = await bcrypt.hash(this.password,salt);
//     this.password = hashedpassword;
// });

const usermodel = mongoose.model("user_model", userSchema);

// (async function createuser() {
//   let user = {
//     name: "user 2",
//     email: "naruto@gmail.com",
//     password: "12345678",
//     confirm_password: "12345678",
//   };
//   let data = await user_model.create(user);
//   console.log(data);
// })();
module.exports = usermodel;
//ltJWMoRRySDEy4gq
