const mongoose = require("mongoose");

//connect mongoose (user schema and model)
const db_link =
  "mongodb+srv://sourabhsbg01:ltJWMoRRySDEy4gq@cluster0.ysk7s5p.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(db);
    console.log("review mongoose connected");
  })
  .catch(function (err) {
    res.json({
      message: err.message,
    });
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user_model",
    required: [true, "review must be belong to a user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "plan_model",
    required: [true, "review must be belong to a plan"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewmodel = mongoose.model("review_model", reviewSchema);

module.exports = reviewmodel;
