import mongoose from "mongoose"

 export default function Camp(){
    const mongodb=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y4nrtd9.mongodb.net/yelp-camp`;
    
    // mongodb= "mongodb://localhost:27017/yelp-camp"
    mongoose.connect(mongodb,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        // useCreateIndex:true,
        // useFindAndModify:false
    })
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', ()=>{
          console.log("connected to database");
    });
   

    
}



