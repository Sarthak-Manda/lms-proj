import mongoose from "mongoose";

//connect to Mongo DB

const connectDB = async ()=> {
    mongoose.connection.on('connected',()=>
         console.log('DB konekted'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)

}

export default connectDB