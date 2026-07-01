import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import initData from "./data.js";
import Listing from "../models/listing.js";
import geocodingClient from "../utils/mapConfig.js";

const  dbUrl = process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected....");
}

main()
    .then(() => {
        const initDb = async () =>{
            try{
                await Listing.deleteMany({});
                const updatedData = initData.map((obj) => ({ ...obj, owner :"69fa2338b7f3d673002b8d59" }));

                await Listing.insertMany(updatedData);
                console.log("Data was intialize..");

            }catch(err){
                console.log(err);
            }finally{
                mongoose.connection.close(); 
                console.log("MongoDB connection closed !");
            }
        }
    initDb();
    })
    .catch((err) => {
        console.log("Error is : " + err);
    });

