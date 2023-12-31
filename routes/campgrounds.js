import express from "express";
import CatchAsyn from "../utils/CatchAsyn.js"
import Campground from "../models/Campground.js"
import {isLoggedIn,ValidateCampground,isAuthor} from "../Middleware.js";
import {index,renderNewForm, createCampground,showCampground, editCampground,renderEditForm,deleteCampground} from "../controller/campgrounds.js";
import multer from 'multer'
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage })


const router=express.Router()

router.route("/")
   .get(CatchAsyn(index))
   .post(isLoggedIn,upload.array('image'),ValidateCampground, CatchAsyn(createCampground))
   // .post(upload.array('image'),(req,res)=>{
   //    console.log(req.body,req.files);
   //    res.send("Working")
   // })

router.get("/new",isLoggedIn,renderNewForm)

router.route("/:id")
     .get(CatchAsyn(showCampground))
     .put(isLoggedIn,isAuthor,upload.array('image'),ValidateCampground, CatchAsyn(editCampground))
     .delete(isLoggedIn,isAuthor,deleteCampground)

router.get("/:id/edit",isLoggedIn,isAuthor,CatchAsyn(renderEditForm))



export default router