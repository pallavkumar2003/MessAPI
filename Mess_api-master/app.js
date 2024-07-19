const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();

app.use(express.json()); //global middleware function
app.listen(3000);
app.use(cookieparser());

// const authRouter = require('./Routers/authRouter.js');
const userRouter = require("./Routers/userRouter.js");
const planRouter = require("./Routers/planRouter.js");
const reviewRouter = require("./Routers/reviewRouter.js");
const bookingRouter = require("./Routers/bookingRouter.js");


// app.use("/auth", authRouter); //global middleware function
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use("/booking", bookingRouter);