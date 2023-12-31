import User from "../models/User.js"

const renderUserForm=(req,res)=>{
    res.render("users/register")
}

const createUser=async(req,res,next)=>{
    try{
        const {email,username,password}=req.body
        const user= new User({email,username})
        const registerdUser =await User.register(user,password)
        req.login(registerdUser,(err)=>{                   // when someone register , it will login too 
            if(err)return next(err)
            req.flash("success","Welcome to Yelpcamp")
            res.redirect("/campgrounds")
        })
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/register")
    }
    
}

const renderLogin=(req,res)=>{
    res.render("users/login")
}

const userLogin=(req,res)=>{
    req.flash("success","Welcome Back!!")
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
       res.redirect(redirectUrl);
}
const userLogout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Thanks for visiting');
        res.redirect('/campgrounds');
    });
}

export {createUser,renderUserForm,renderLogin,userLogin,userLogout}