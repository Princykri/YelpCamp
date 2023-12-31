import ExpressError from "./utils/ExpressError.js"
import {CampgroundSchema,ReviewSchema} from "./Schemas.js"
import Campground from "./models/Campground.js"
import Review from "./models/Review.js"
import passport from "passport"

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl;
        req.flash("error","You must be loged in Fisrt")
        return res.redirect("/login")
    }
    next()
}
const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
const ValidateCampground=(req,res,next)=>{
    const{error}=CampgroundSchema.validate(req.body)
     if(error){
         const msg=error.details.map(el=>el.message).join(",")
         throw new ExpressError(msg,404)
     }else{
        next()
     }
}
const ValidateReview=(req,res,next)=>{
    const{error}=ReviewSchema.validate(req.body)
     if(error){
         const msg=error.details.map(el=>el.message).join(",")
         throw new ExpressError(msg,404)
     }else{
        next()
     }
} 

const isAuthor=async(req,res,next)=>{
    const reqid=req.params.id
    const campground= await Campground.findById(reqid)
    if(!campground.author.equals(req.user._id)){
        req.flash('success',"you don't have permission, request denied! ")
        res.redirect(`/campgrounds/${campground._id}`)
    }
    next()
}
const isAuthorReview=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review= await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('success',"you don't have permission, request denied! ")
        res.redirect(`/campgrounds/${id}`)
    }
    next()
}
export  { isLoggedIn,storeReturnTo,ValidateCampground,isAuthor,ValidateReview,isAuthorReview}