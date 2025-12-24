// const asyncHandler = () =>{}
// const asyncHandler = (func) => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// Method 1 using promises
const asyncHandler = (requestHandler) => {
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export {asyncHandler }
















// Method 2 using try catch

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// export {asyncHandler} 