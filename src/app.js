import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app= express(); 

// configuring cors which we imported
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

//limiting data in json format for express app
app.use(express.json({limit:"16kb"}))

// app.use(express.urlencoded())       itna rehta to bhi kaam kr jayega
app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

export {app }