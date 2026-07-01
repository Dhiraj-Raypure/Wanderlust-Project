import mongoose from "mongoose";
import Review from "./reviews.js"; 

const listSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    image :{
        url: {
            type: String,
            required : true
        },
        filename: {
            type: String,
        }
    }, 
    
    location : {
        type : String,
        required : true
    },
    
    country : {
        type : String,
        required : true
    },

    reviews :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category : {
        type : String,
        enum : ["Trending","Rooms","Iconic-cities","Mountains","Beaches","Hill-Stations","Lake-Front","Camping","Farms","Arctic"],
    }
});

listSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({ _id : { $in : listing.reviews }});
    }
})

const Listing = mongoose.model("Listing", listSchema);

export default Listing;