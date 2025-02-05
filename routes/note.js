const express = require("express");
const router = express.Router();
const { Note } = require("../models/note");
const {isLoggedIn}=require("../Util/middleware");
const {User}=require("../models/user.js");
router.get("/",isLoggedIn,async(req,res)=>{
    const notesArr=await Note.find({user:req.user._id});
    
    res.render("note/notes",{notesArr});
});
 


router.post("/save", isLoggedIn, async (req, res) => {
    try {
        const currnote = new Note({
            content: req.body.content,
            user: req.user._id
        });

        await currnote.save();
        console.log("Note saved:", currnote);

       
        await User.findByIdAndUpdate(req.user._id, {
            $push: { notes: currnote._id }
        });

        req.flash("success", "Note created");
        res.redirect("/notes");
    } catch (error) {
        console.error("Error saving note:", error);
        req.flash("error", "Failed to create note");
        res.redirect("/notes");
    }
});
      



router.post("/delete/:id", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        console.log("User:", req.user);
        console.log("Note ID to delete:", req.params.id);

        if (!user.notes.includes(req.params.id)) {
            req.flash("error", "Unauthorized or Note not found!");
            return res.redirect("/notes");
        }

        
        user.notes = user.notes.filter(noteId => noteId.toString() !== req.params.id);
        await user.save();

      
        await Note.findByIdAndDelete(req.params.id);

        req.flash("success", "Note deleted successfully");
        res.redirect("/notes");

    } catch (error) {
        console.error("Error deleting note:", error);
        req.flash("error", "Failed to delete note");
        res.redirect("/notes");
    }
});




router.get("/create",isLoggedIn,async(req,res)=>{
    res.render("note/createNote");
});

module.exports=router;