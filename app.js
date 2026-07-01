import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import methodOverride from "method-override";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import AppError from "./utils/AppError.js";
import listingRouter from "./routes/listing.js";
import reviewRouter from "./routes/review.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import User from "./models/user.js";
import userRouter from "./routes/user.js";

const app = express();
const port = 8080;
const  dbUrl = process.env.ATLASDB_URL;

// fix : __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View Engine
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"/views"));

// Middleware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// method-override
app.use(methodOverride("_method"));

// use ejs-locals for all ejs templates:
app.engine('ejs',ejsMate);

app.use(cookieParser());  


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized: true,
    cookie : {
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

store.on("error", (err) => {
    console.log("Session Store Error:", err);
});

//express-sessions
app.use(session(sessionOption));
app.use(flash());  // using flash
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


async function main(){
    await mongoose.connect(dbUrl);
}

main()
    .then(() => {
        console.log("MongoDB connected....");
    })
    .catch((err) => {
        console.log("Error is : " + err);
    });
 
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});  


app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

app.all("{*path}", (req,res,next) =>{
    return next(new AppError("Page not found" , 404));
});

app.use((err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";
    res.status(err.statusCode).render("listings/error.ejs",{err});
});

// Start Server
app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});