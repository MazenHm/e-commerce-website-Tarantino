const userRouters = require("./UserRouters");
const productRouters = require("./ProductRouters");
const categoryRouters = require("./CategoryRouters");
const addressRouters = require("./AddressRouters");
const orderRouters = require("./OrderRouters");
const announceRouters = require("./AnnounceRouters");
const framesRouters = require("./FramesRouters");
const bestSellersRouters = require("./BestSellersRouters");
const couponRouters = require("./CouponRouter");
const statisticRouters = require("./StatisticRouters");

const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/v1/api", userRouters);
  app.use("/v1/api", productRouters);
  app.use("/v1/api", categoryRouters);
  app.use("/v1/api", addressRouters);
  app.use("/v1/api", orderRouters);
  app.use("/v1/api", announceRouters);
  app.use("/v1/api", framesRouters);
  app.use("/v1/api", bestSellersRouters);
  app.use("/v1/api", couponRouters);
  app.use("/v1/api", statisticRouters);
};
