import express from "express";
import User from "../models/user.js";
import passport from "passport";

const signupPage = (req,res) =>{
    res.render("./users/signup.ejs");
}

const createAccount = async (req,res) =>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({username,email});
        const registerUser = await User.register(newUser,password);

        req.login(registerUser,(err) =>{
            if(err) return next(err);
            req.flash("success","Welcome to WandurLust");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("failure",e.message);
        res.redirect("/signup");
    }

}

const loginPage = async(req,res) =>{
    res.render("./users/login.ejs")
}

const loginInto = async (req,res) =>{
        req.flash("success","Welcome back to WanderLust !");
        let redirectUrl = res.locals.redirectUrl || "/listings";

        if(redirectUrl.includes("/reviews")){
            redirectUrl = redirectUrl.split("/reviews")[1];
        }
        console.log(redirectUrl);
        res.redirect(redirectUrl);
}

const logoutFrom = (req,res,next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
    });
    req.flash("success","you logged out");
    res.redirect("/listings");
}

export {signupPage, createAccount, loginPage, loginInto, logoutFrom};