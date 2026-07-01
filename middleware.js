import passport from "passport";
import Listing from "./models/listing.js";
import {listingSchema,reviewSchema} from "./schema.js";
import AppError from "./utils/AppError.js";
import Review from "./models/reviews.js"

const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","To add New Listing You must be logged in");
        return res.redirect("/login");
    }
    next();
};

const saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

const isOwner = async (req,res,next) => {
    let {id} = req.params;

    let list = await Listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not Owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const validateListing = (req,res,next) =>{
    if(!req.body || !req.body.listing){
        return next(new AppError("Invalid or Missing data", 400));
    }
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw next(new AppError(errMsg,400));
    }
    next();
} 

const validateReview = (req,res,next) =>{
    if(!req.body || !req.body.review){
        return next(new AppError("Invalid or Missing data", 400));
    }
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new AppError(errMsg,400);
    }else{
        next(); 
    }
}

const isReviewOwner = async (req,res,next) => {
    let {id, reviewId} = req.params;

    let review = await Review.findById(reviewId);
    if(!review.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not Owner of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

export { isReviewOwner, validateReview, validateListing, isOwner, isLoggedIn, saveRedirectUrl };
