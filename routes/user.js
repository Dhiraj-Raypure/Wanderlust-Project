import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import {saveRedirectUrl} from "../middleware.js";
import { signupPage, createAccount, loginPage, loginInto, logoutFrom} from "../controllers/user.js";

const router = express.Router();

router.get("/signup", wrapAsync(signupPage));

router.post("/signup", wrapAsync(createAccount));

router.get("/login",wrapAsync(loginPage));

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect : '/login',
        failureFlash : true,
    }),
    wrapAsync(loginInto)
); 

router.get("/logout", wrapAsync(logoutFrom));


export default router;