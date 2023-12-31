import Campground from "../models/Campground.js";
import Review from "../models/Review.js";


const NewReview=async(req,res)=>{
    const id=req.params.id
    const camp=await Campground.findById(id)
    const review=new Review(req.body.review)
    review.author=req.user._id
    camp.reviews.push(review)
    await review.save()
    await camp.save()
    req.flash('success',"Successfully added new review")
    res.redirect(`/campgrounds/${id}`)

}

const DeleteReview=async(req,res)=>{
    const {id,reviewId}=req.params
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Successfully deleted one review")
    res.redirect(`/campgrounds/${id}`)
 
 }

 export  {NewReview,DeleteReview}