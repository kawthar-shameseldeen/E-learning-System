import mongoose from "mongoose";

const  conn=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err);
    }
}

export default conn;