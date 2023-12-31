// this file is independent from other file to set the data 
import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}
import mongoose from 'mongoose';
import {cities} from './cities.js';
import { places, descriptors } from './seedHelpers.js';
import Campground from'../models/Campground.js';
import dbConnect from '../models/dbConnect.js'

// const mongodb=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y4nrtd9.mongodb.net/yelp-camp`;
    
//     // mongodb= "mongodb://localhost:27017/yelp-camp"
//     mongoose.connect(mongodb,{
//         useNewUrlParser:true,
//         useUnifiedTopology: true,
//         // useCreateIndex:true,
//         // useFindAndModify:false
//     })
    
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', ()=>{
//           console.log("connected to database");
//     });
   
dbConnect()

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    const price=Math.floor(Math.random()*20)+10
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author:"658d26f57d15d361ee5bb193",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://unsplash.com/collections/483251',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti harum accusantium rerum animi fuga impedit ipsum neque sed enim minima dolorem quos sit perferendis, facere dolore error veniam fugit esse.',
            price ,     // same as price:price 
            images: [
                {
                    url: 'https://res.cloudinary.com/devaohh9k/image/upload/v1701337586/Yelpcamp/njytk6ue5ryuugizuu5e.jpg',
                    filename: 'Yelpcamp/njytk6ue5ryuugizuu5e',
                  },
                  {
                    url: 'https://res.cloudinary.com/devaohh9k/image/upload/v1701337586/Yelpcamp/hk1emgapjugrck5inwrv.jpg',
                    filename: 'Yelpcamp/hk1emgapjugrck5inwrv',
                  },
                  {
                    url: 'https://res.cloudinary.com/devaohh9k/image/upload/v1701337588/Yelpcamp/xg5lqwwhiuqf4s9mnakm.jpg',
                    filename: 'Yelpcamp/xg5lqwwhiuqf4s9mnakm',
                  }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})