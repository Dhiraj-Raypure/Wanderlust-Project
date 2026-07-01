import express from "express";
import Review from "../models/reviews.js"; 
import Listing from "../models/listing.js";
import AppError from "../utils/AppError.js";

const createReview = async (req,res,next) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;

    if(!listing){
        return next(new AppError("Listing not found", 404));
    }
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Created Successfully !");
    res.redirect(`/listings/${id}`);
}

const destroyReview = async (req,res,next) =>{
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}},{runValidators : true});
    req.flash("success", "Review Deleted ! ");
    res.redirect(`/listings/${id}`);
}

export {createReview, destroyReview};