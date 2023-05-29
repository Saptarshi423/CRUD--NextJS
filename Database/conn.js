import mongoose from "mongoose";
const MONGO_URI = 'mongodb+srv://kattyayan75:admin123@cluster0.6l9x8gu.mongodb.net/?retryWrites=true&w=majority';


const connectMongo = async()=>{
    try {
        const {connection} = await mongoose.connect(MONGO_URI);

        if(connection.readyState == 1){
            console.log('Connected to DB')
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectMongo;