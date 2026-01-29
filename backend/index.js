import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import pasteRoutes from './routes/pasteRoutes.js';


dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.use('/api', pasteRoutes);


// app.get("/", (req,res) =>{
//     res.send(("hello node js"))
// })

app.listen(PORT,() => {
    console.log("server is running on port " , PORT );  
})
