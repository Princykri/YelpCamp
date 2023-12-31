import mongoose  from "mongoose";
import Review from "./Review.js"
// https://res.cloudinary.com/devaohh9k/image/upload/w_300/v1701337586/Yelpcamp/njytk6ue5ryuugizuu5e.jpg

const ImageSchema=new mongoose.Schema( {
    url:String,
    filename:String
})
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace("/upload","/upload/w_150")
})

const campgroundSchema=new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    images:[ImageSchema],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})


campgroundSchema.post('findOneAndDelete', async function (camp) {
    if (camp) {
        const res = await Review.deleteMany({ _id: { $in: camp.reviews } })
        console.log(res);
    }
})

const Campground=mongoose.model("Campground",campgroundSchema)
export default Campground