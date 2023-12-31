import Campground from "../models/Campground.js"
import {cloudinary} from "../cloudinary/index.js"


const index=async(req,res)=>{
    // we can use .then or asyn/await 
     const campgrounds= await Campground.find()
     res.render("campgrounds/index",{campgrounds});
 
 }
const renderNewForm =(req,res)=>{
    res.render("campgrounds/new");
}

const createCampground=async(req,res,next)=>{
    const camp=new Campground(req.body.campground)
    camp.images=req.files.map(f=>({url:f.path , filename:f.filename}))
    camp.author=req.user._id
    await camp.save()
    console.log(camp)
    req.flash('success',"Successfully Created New Campground ")
    res.redirect(`/campgrounds/${camp.id}`)
}

const showCampground=async(req,res)=>{
    const reqid=req.params.id
    const campground=await Campground.findById(reqid).populate({
       path:'reviews',
       populate:{
           path:"author"
   }}).populate('author')

    if(!campground){
       req.flash('error',"Campground not found")
       return res.redirect('/campgrounds')
    }
    res.render("campgrounds/show",{campground});

}
const renderEditForm=async(req,res)=>{
    const reqid=req.params.id
    const campground= await Campground.findById(reqid)
    if(!campground){
        req.flash('error',"Campground not found")
        return res.redirect('/campgrounds')
     }
   
    res.render("campgrounds/edit",{campground});
   
}

const editCampground=async(req,res)=>{
    const id=req.params.id
    console.log(req.body)
    const camp=await Campground.findByIdAndUpdate(id,{...req.body.campground})
    const img=req.files.map(f=>({url:f.path , filename:f.filename}))
    camp.images.push(...img)
    await camp.save()
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await camp.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
    req.flash('success',"Successfully Updated Campground ")
    res.redirect(`/campgrounds/${camp._id}`)
}

const deleteCampground=async(req,res)=>{
    const id=req.params.id
     await Campground.findByIdAndDelete(id)
     req.flash('success',"Successfully Deleted Campground ")
     res.redirect("/campgrounds")
 }

 export {index,renderNewForm,createCampground,showCampground,renderEditForm,editCampground,deleteCampground}