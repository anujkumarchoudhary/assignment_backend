import express from 'express'
import MongoDBConnect from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import bookRoutes from './routes/book.routes.js'
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
import serverless from 'serverless-http'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// DB connect
MongoDBConnect()

// Routes
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/book', bookRoutes)

// Export as serverless function
export const handler = serverless(app)
