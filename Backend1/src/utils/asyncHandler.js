
//for propmise
const asyncHandler  = (rquestHandler) => {
   return (req, res, next) => {
  Promise.resolve(rquestHandler(req, res, next)).catch(next);
  ((err)=> next(err))

}
}

export {asyncHandler}

// Path: Backend1/src/utils/asyncHandler.js

// for try catch 
// const asyncHandler = (fn) => async (err ,req,res,next) =>{
//     try {
//         await fn (err,req,res,next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : error.message || "Server Error"
//         })
//     }
// }
