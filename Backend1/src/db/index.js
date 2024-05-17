import mongoose from 'mongoose';
import { DATA_BASE_NAME } from '../constants.js';

const connectDB = async () => {
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DATA_BASE_NAME}`);
       console.log(`\nConnected to ${connectionInstance.connection.name} database\n`);

    
    } catch (error) {
        console.log('Error connecting to the database', error);
        process.exit(1);
    }
}

export default connectDB;