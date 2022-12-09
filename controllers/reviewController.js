const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  // console.log(req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  //建议if user直接next()
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.body.user);
  next();
};

exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
