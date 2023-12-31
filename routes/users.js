import express from "express"
import {storeReturnTo} from "../Middleware.js"
import passport from "passport"
import CatchAsyn from "../utils/CatchAsyn.js"
import User from "../models/User.js"
import {renderUserForm,createUser,renderLogin,userLogin,userLogout} from "../controller/users.js"


const router =express.Router()

router.route("/register")
      .get(renderUserForm)
      .post(CatchAsyn(createUser))

router.route("/login")
      .get(renderLogin)
      .post(storeReturnTo, passport.authenticate('local',{failureFlash:true,failureRedirect:"/login"}),userLogin)

router.get('/logout',userLogout ); 
export default router