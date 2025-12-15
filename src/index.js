// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()


















/*    METHOD 1 OF DATA CONNECTION

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"

// IIFE
// ;( async ()=>{})()    //purpose of that leading semicolon: cleaning purpose hai, yaad rkhne k liy. Here not needed, we can see previous line pe semicolon already h.

import express from "express"
const app= express()

//IIFE
( async ()=>{
    try{
        //error nhi h toh connect krdo mongoose se
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error",(error)=>{
        console.log("ERROR: ",error);
        throw error
       })
       app.port(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
       })
    } catch (error) {
        console.error("ERROR: ",error)  //console.log bhi kr skte the
        throw error     // error throw kr do
    } 
})()

*/