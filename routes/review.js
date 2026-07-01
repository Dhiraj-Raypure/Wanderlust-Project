import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {createReview, destroyReview} from "../controllers/review.js";
import { validateReview, isLoggedIn, isReviewOwner} from "../middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

router.delete("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(destroyReview));

export default router;