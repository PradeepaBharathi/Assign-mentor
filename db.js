import { MongoClient } from "mongodb";
import Obj from "mongodb";
import dotenv from "dotenv";

dotenv.config()

const mongoURL = process.env.MONGO_URL;
export async function dbConnection() {
    const client = new MongoClient(mongoURL);
    await client.connect();
    console.log("DB Connected");
    return client;
}


export var ObjectId = Obj.ObjectId;
export const client = await dbConnection()

