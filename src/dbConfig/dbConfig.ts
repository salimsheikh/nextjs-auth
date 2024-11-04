import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false; // Track the connection sta

// Function to establish a MongoDB connection
export async function connectdb(){

    if (isConnected) {
        return; // Use existing connection if already connected
      }

    try {

        mongoose.connect(MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            isConnected = true;
            //console.log("MongoDB Connected");

            // Logs the successful connection and displays the MongoDB host
            console.log(`\n MongoDB connected !! DB HOST: ${connection.host}`);
        });

        connection.on('error',(error) => {
            console.log("MongoDB Connection error, please make sure db is up and running" + error);
            process.exit();
        });
        
    } catch (error) {
        console.log("Something went wrong in connection db");
        console.log(error);
    }
}