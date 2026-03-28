import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import clerkWebhooks from "./controllers/webhooks.js"
import educatorRouter from "./Routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"

const app = express()

await connectDB()
await connectCloudinary()

app.use(cors())
app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY
}))

app.get('/', (req, res) => res.send("API working"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`wahoooooo ${PORT}`)
})