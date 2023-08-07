import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./db.js";
import { assignRouter } from "./routes/route.js";


dotenv.config();
const PORT = process.env.PORT;


const app = express();
// dbConnection()

app.use(express.json());
app.use(cors());
app.use("/app",assignRouter)


app.listen(PORT,()=>
    console.log(`LISTENING TO PORT ${PORT}`)
)

app.get("/", (req, res) => {
    res.send("working properly")
})