const review_model = require("../models/reviewmodel");
const plan_model = require("../models/planmodel");

module.exports.getAllreview = async function getAllreview(req, res) {
  try {
    const review = await review_model.find();
    if (review) {
      return res.json({
        message: "all review retrived",
        data: review,
      });
    } else {
      return res.json({
        message: "no review available",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getPlanreview = async function getPlanreview(req, res) {
  try {
    let planid = req.params.id;
    let reviews = await review_model.find();
    reviews = reviews.filter(reviews => reviews.plan._id == planid)
    // console.log(review.plan._id);
    return res.json({
      message: "review of this particular plan",
      data:reviews
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) { 
  try {
    let id = req.params.id;
    let plan = await plan_model.findById(id);
    // console.log(plan.name);
    let review = await review_model.create(req.body);
    plan.ratingAverage = ((plan.ratingAverage + req.body.rating) / 2);
    await plan.save();
    if (review) {
      return res.json({
        message: "review saved sucessfully",
        data: review,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    let review = await review_model.findByIdAndDelete(id);
    return res.json({
      message: "review deleted sucessfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    let datatobeupdated = req.body;
    const keys = [];
    for (let key in datatobeupdated) {
      keys.push(key);
    }
    let review = await review_model.findById(id);
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = datatobeupdated[keys[i]];
    }
    await review.save();
    res.json({
      message: "plan updated successfuly",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3review = async function top3review(req, res) {
  try {
    let review = await review_model
      .find()
      .sort({
        rating: -1,
      })
      .limit(3);
    return res.json({
      message: "top 3 plan",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
