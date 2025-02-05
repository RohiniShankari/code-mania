const express = require("express");
const router = express.Router();
const {isLoggedIn}=require("../Util/middleware.js");
const getLeetcodeProfile =require("../Util/leetcode.js");
router.get("/leetcode",isLoggedIn,async(req,res)=>{
    const user=await getLeetcodeProfile(req.user.leetcodeUserName);
    const submissions=user.matchedUser.submitStats.acSubmissionNum;
    const profile=user.matchedUser.profile;
     
    const details={profile:profile,submissions:submissions};
         
    const data=await fetch("https://contest-hive.vercel.app/api/leetcode");
    const contests=await data.json();
    
    res.render("compete/leetcodeProfile",{details,contests});
    
});
module.exports=router;