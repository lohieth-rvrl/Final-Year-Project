import { connect as _connect } from "mongoose";

const connectDB = async () => {
    try {
        const connect = await _connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;