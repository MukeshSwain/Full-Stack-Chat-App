import express from "express";
import 'dotenv/config';
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.routes.js"
import { server, app } from "./lib/socket.io.js";
import path from "path";


const port = process.env.PORT || 3000;
const __dirname = path.resolve();
// const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../FRONT-END/dist")))

    app.get("*",(req, res) => {
        res.sendFile(path.join(__dirname, "../FRONT-END","dist","index.html"))
    })
    
}
  server.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
  });