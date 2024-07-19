const mongoose = require("mongoose");

//connect mongoose (user schema and model)
const db_link =
  "mongodb+srv://sourabhsbg01:ltJWMoRRySDEy4gq@cluster0.ysk7s5p.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(db);
    console.log("plan mongoose connected");
  })
  .catch(function (err) {
    // res.json({
    //   // message: err.message,
    //   data:"plan not connected"
    // });
    console.log("plan not connected");
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "name is not grater than 20 words"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratingAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: function () {
      return this.discount < 100;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "resturant-owner", "deliveryboy"],
    default: "user",
  },
});

const planmodel = new mongoose.model("plan_model", planSchema);

// (async function createPlan() {
//   let planobj = {
//     name: "fast food 2",
//     duration: 30,
//     price: 100,
//     ratingAverage: 4,
//     discount: 20,
//   };

//   const data = await planModel.create(planobj);
//   console.log(data);

//   //   const data = new planmodel(planobj);
//   //   await data.save();
// })();

module.exports = planmodel;
