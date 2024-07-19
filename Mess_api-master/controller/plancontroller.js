const plan_model = require("../models/planmodel.js");

module.exports.getAllplan = async function getAllplan(req, res) {
  try {
    let allplan = await plan_model.find();
    if (allplan) {
      return res.json({
        message: "plan retrived sucessfully",
        data: allplan,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getplan = async function getplan(req, res) {
  try {
    let id = req.params.id;
    let plans = await plan_model.findById(id);
    if (plans) {
      return res.json({
        message: "plan retrived",
        data: plans,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createplan = async function createplan(req, res) {
  // console.log("priblem is here");
  try {
    let dataobj = req.body;
    let plan = await plan_model.create(dataobj);
    if (plan) {
      res.json({
        message: "plan added sucessfully",
        data: plan,
      });
    } else {
      res.json({
        message: "invalid plan details",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteplan = async function deleteplan(req, res) {
  try {
    let id = req.params.id;
    let plan = await plan_model.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted sucessfully",
      data: plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updateplan = async function updateplan(req, res) {
  try {
    let id = req.params.id;
    let datatobeupdated = req.body;
    const keys = [];
    for (let key in datatobeupdated) {
      keys.push(key);
    }
    let plan = await plan_model.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = datatobeupdated[keys[i]];
    }
    await plan.save();
    res.json({
      message: "plan updated successfuly",
      data: plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3plan = async function top3plan(req, res) {
  try {
    let plans = await plan_model
      .find()
      .sort({
        ratingAverage: -1,
      })
      .limit(3);
    return res.json({
      message: "top 3 plan",
      data: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
