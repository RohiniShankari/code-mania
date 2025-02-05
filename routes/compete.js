
const express = require("express");
const router = express.Router();
const getHackerearthContests = require("../Util/hackerearth");
const {isLoggedIn}=require("../Util/middleware.js");
const getDevfolioHackthons=require("../Util/devfolio.js");
const getContests=require("../Util/allContests.js");
router.get("/codingChallenges",isLoggedIn,async(req,res)=>{
     
    const data=await fetch("https://contest-hive.vercel.app/api/all");
    const contests=await data.json();
    const allContests=getContests(contests.data);
    
    res.render("compete/allCodingChallenges",{allContests});
    
});


router.get("/hackthons",isLoggedIn, async (req, res) => {
    
    try {
        const hackerearthHackthons = await getHackerearthContests(); // Fetch Hackerearth contests
         const devfolioHackthons=await getDevfolioHackthons();
         
         res.render("compete/hackthons", { hackerearthHackthons:hackerearthHackthons,devfolioHackthons:devfolioHackthons }); // Send contests data to EJS
     } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching contests");
    }
    
});

module.exports=router;