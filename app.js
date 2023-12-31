import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}
import express from "express"
import dbConnect from "./models/dbConnect.js"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import ejsMate from "ejs-mate"
import ExpressError from "./utils/ExpressError.js"
import path from "path"
import session from "express-session"
import flash from 'connect-flash'
import passport from "passport"
import LocalStrategy from "passport-local"
import User from "./models/User.js"


import campgroundRoutes from "./routes/campgrounds.js"
import reviewRoutes from "./routes/reviews.js"
import userRouter from "./routes/users.js"

const __dirname = path.resolve();
const app=express()
dbConnect()

const port = process.env.PORT;

const sessionConfig={
    secret:"this is my secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,   // for 1 week 
        maxAge:1000*60*60*24*7
    }

}



app.engine('ejs',ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/",(req,res)=>{
    res.render("home")
})

app.use((req,res,next)=>{
    if(!["/login","/"].includes(req.originalUrl)){
        req.session.returnTo=req.originalUrl
    }
   res.locals.currentUser=req.user
   res.locals.success= req.flash('success')
   res.locals.error= req.flash('error')
   next()
})

app.use("/",userRouter)
app.use("/campgrounds",campgroundRoutes)
app.use("/campgrounds/:id/reviews",reviewRoutes)





app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})
app.use((err,req,res,next)=>{
    const {statusCode =500}=err
    if(!err.message) err.message="Something went Wong"
    res.status(statusCode).render("error",{err});
})

app.listen(port,(req,res)=>{
    console.log("Server is Running")
})