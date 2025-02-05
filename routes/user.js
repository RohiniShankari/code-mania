const express=require("express");
const router=express.Router();
const {User}=require("../models/user.js");
const passport=require("passport");


router.get("/signUp",async(req,res)=>{
    res.render("users/signUp");
});
 
router.post("/signUp",async(req,res)=>{
    try{
    let {email,username,leetcodeUserName,password}=req.body;
    const newUser=new User({email,leetcodeUserName,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to codemania");
        res.redirect("/home");
    });
    
    }catch(e){
        req.flash("error","username or leetcode username already exists");
        res.redirect("/user/signUp");
    }
});


router.post("/login",
    passport.authenticate("local", { 
        failureRedirect: "/user/login",
        failureFlash: true 
    }),
    async(req, res) => {
        req.flash("success", "Welcome back to CodeMania!");
        res.redirect("/home");
    }
);
router.get("/login",async(req,res)=>{
    res.render("users/login");
});

router.get("/logout",async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        
    });
    res.redirect("/home");
});





module.exports=router;