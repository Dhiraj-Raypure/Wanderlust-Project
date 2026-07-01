import express from "express";     
import wrapAsync from "../utils/wrapAsync.js";
import {isLoggedIn,isOwner,validateListing} from "../middleware.js";
import {index, newPage,showListing, createListing, editListing, updateListing, deleteListing,showTypesOfListing,searchDesti} from "../controllers/listing.js";
import multer from "multer";
import {storage} from "../utils/cloudinaryConfig.js";
const upload = multer({storage});

const router = express.Router();
 
router.get("/new",isLoggedIn, wrapAsync(newPage));
router.get("/search", wrapAsync(searchDesti));
router.get("/categories/:type",wrapAsync(showTypesOfListing));
 
router.route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(createListing));
    

router.route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));
    

router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(editListing));

export default router;