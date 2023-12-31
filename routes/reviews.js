import express from "express";
import CatchAsyn from "../utils/CatchAsyn.js"
import {isLoggedIn,ValidateReview,isAuthorReview} from "../Middleware.js";
import {NewReview,DeleteReview} from "../controller/reviews.js"

const router=express.Router({mergeParams:true})



router.post("/",isLoggedIn,ValidateReview,CatchAsyn(NewReview))

router.delete("/:reviewId",isLoggedIn,isAuthorReview,CatchAsyn(DeleteReview))


export default router