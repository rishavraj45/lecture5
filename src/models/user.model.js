import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,   // searching jyada better krni hai kisi field pe toh index ko true krte hai.
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }, 
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar:{
        type: String, //using cloudinary url
        required: true,
    },
    coverImage:{
        type: String, //using cloudinary url
    },
    // watchHistory jo field hai wo dependent hai videos pe.  ye ek array hoga kyuki multiple values add krte jayenge.
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))  return next();
    this.password = bcrypt.hash(this.password, 10)  // 10 is the round, kitne rounds cahiye after hashing
    next()
})

// password check
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)   // this.password is the hashed password
}


//after putting access and refresh tokens in .env, put these 2 methods to generate token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)