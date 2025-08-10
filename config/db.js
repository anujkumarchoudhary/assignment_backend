import mongoose from "mongoose";

const MongoDBConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB)
        console.log("db connect")
    }
    catch (err) {
        console.log("error", err)
    }

}

export default MongoDBConnect;