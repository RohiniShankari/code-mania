const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const engine= require("ejs-mate");
require('dotenv').config();

const passport=require("passport");
const LocalStrategy=require("passport-local");
const {User}=require("./models/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");

const noteRoute=require("./routes/note.js");
const profileRoute=require("./routes/profile.js");
const competeRoute=require("./routes/compete.js");
const userRouter=require("./routes/user.js");

const store=MongoStore.create({

    mongoUrl:process.env.MONGOURL,
    crypto:{
        secret:"mysecretcode",
    },
    touchAfter:24*60*60
});
store.on("error",()=>{
    console.log("error with session",err);
});
const sessionOptions={
    store:store,
    secret:"mysecretcode",
    resave:false,
    saveUnintialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.engine('ejs',engine);
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.deleted=req.flash("deleted");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.use("/notes",noteRoute);
app.use("/compete",competeRoute);
app.use("/profile",profileRoute);
app.use("/user",userRouter);
main()
.then(()=>{
    console.log("connected  to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(process.env.MONGOURL);
}



app.get("/home",(req,res)=>{
    res.render("home");
});
app.listen(8080,()=>{
    console.log("listening on port 8080");
});
