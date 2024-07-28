import mongoose from "mongoose";


const connectDb=async()=>{
  try{
    const mongodb = await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);
    console.log("Succefully connected to mongodb",mongodb.connection.host);
  }
  catch(err){
    console.log("Error while connecting db",err);
  }
}

export default connectDb;