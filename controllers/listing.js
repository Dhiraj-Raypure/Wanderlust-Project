import express from "express";
import Listing from "../models/listing.js";
import AppError from "../utils/AppError.js";
import geocodingClient from "../utils/mapConfig.js";

const index = async (req,res,next) =>{
    const allListings = await Listing.find({});
    if(!allListings.length){
        return next(new AppError("no data found in DB",404));
    }
    res.render("listings/index",{allListings});
}

const newPage = (req,res) =>{
    res.render("listings/new");
}

const showTypesOfListing = async (req,res,next) =>{
    let type = req.params.type;
    const listings = await Listing.find({ category: type });

    if(listings.length === 0){
        return next(new AppError("no data found in DB",404))
    }
    res.render("listings/index",{allListings: listings});
}

const searchDesti = async (req, res, next) => {
    const { search } = req.query;

    const listings = await Listing.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } }
        ]
    });

    if (listings.length === 0) {
        return next(new AppError("No data found", 404));
    }

    res.render("listings/index", { allListings: listings });
};

const showListing = async (req,res,next) =>{ 
    const {id} = req.params;
    const list = await Listing.findById(id).populate({path : "reviews", populate : {path : "owner"}}).populate('owner');    
    if(!list){
        req.flash("error", "the listing you requested for does not existed");
        return res.redirect("/listings"); 
    }
    res.render("listings/show",{list});
}

const createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode(
        {query: req.body.listing.location,limit: 1}).send();

    if(!req.file){
        req.flash("error", "image is required")
        res.render("listings/new");
    }

    const newListing =  new Listing(req.body.listing);
    newListing.image = {
        url: req.file.path,
        filename: req.file.filename
    };
    newListing.owner = req.user._id;

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    return res.redirect("/listings");
}

const editListing = async (req,res,next) =>{
        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            return next(new AppError("No listing found", 404));
        }

        let updated_url = listing.image.url;
        updated_url = updated_url.replace(
            "/image/upload",
            "/image/upload/w_250,h_300,c_fill,e_blur:300"
        );
        res.render("listings/edit",{listing, updated_url}); 
}

const updateListing = async (req, res, next) => {
    const { id } = req.params;
    const { listing } = req.body;

    if (!listing) {
        return next(new AppError("No data provided", 400));
    }

    let updated_Listing = await Listing.findByIdAndUpdate(
        id,
        listing,
        { returnDocument : 'after', runValidators: true }
    );

    if (!updated_Listing) {
        req.flash("error", "the listing you requested for does not existed");
        return res.redirect("/listings");
    }

    if(req.file){
        updated_Listing.image = {
            url : req.file.path, 
            filename : req.file.filename
        }
    }
    await updated_Listing.save();

    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);

}

const deleteListing =  async (req, res, next) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        return next(new AppError("Listing not found", 404));
    }
    req.flash("success", "Listing Deleted ! ");
    res.redirect("/listings");
}

export {index, newPage, showListing, createListing, editListing, updateListing, deleteListing,showTypesOfListing,searchDesti};
