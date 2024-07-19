let SK =
  "sk_test_51NakCsSBBR8mRWDIPStRbTBlsk_test_51NakCsSBBR8mRWDIPStRbTBlQdI0At5mMl94jSLBUpT9p4Muq2hZtNRL2ACnNNLiHX9B8Tw45EAB4A1VCfmQUWyM00jDfCvSBMQdI0At5mMl94jSLBUpT9p4Muq2hZtNRL2ACnNNLiHX9B8Tw45EAB4A1VCfmQUWyM00jDfCvSBM";
const stripe = require("stripe")(SK);
const user_model = require("../models/usermodel");
const plan_model = require("../models/planmodel");

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    const user = await user_model.findById(userId);
    const plan = await plan_model.findById(planId);

    const session = await stripe.Checkout.Session.create({
      payment_method_type: ["card"],
      customer_email: user.email,
      client_refrence_id: plan.id,
      lines_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      // mode: 'payment',
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};
