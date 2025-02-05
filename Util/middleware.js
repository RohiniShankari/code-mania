module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you need to login/signUp first");
        return res.redirect("/user/login");
    }
    next();
};