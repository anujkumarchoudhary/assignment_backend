import express from 'express'
import MongoDBConnect from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import bookRoutes from './routes/book.routes.js'
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
dotenv.config()
const app = express()

app.use(cors());

app.use(express.json())
app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//db connect
MongoDBConnect()

// routes
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/book', bookRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server runing on PORT ${process.env.PORT}`)
})