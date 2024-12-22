import mongoose from "mongoose";

export async function connectDb() {
    try {
        const connectionInstance = mongoose.connect(process.env.MONGODB_URL!);      //! sure that process.env.MONGODB_URL will not be null or undefined at runtime 
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("error while connecting to database",error)
        process.exit(1)
    }
}