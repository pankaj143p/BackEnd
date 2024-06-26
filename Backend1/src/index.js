import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import {app} from './app.js'
dotenv.config(
    {
        path: './.env'
    }
)


connectDB()

.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
    .catch((error)=>{
        console.log("Mongo connection failed", error)
    
})


// import mongoose from 'mongoose'
// import express from 'express'
// import {DATA_BASE_NAME} from '../src/constants.js'

// const app = express()
// ( async () => {
//    try {
//      await mongoose.connect(`${process.env.MONGODB_URI}/${DATA_BASE_NAME}`) 
//      app.on("error", (error) => {
//         console.log("Error", error)
//         throw error
//      } )

//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`)
//     })
//    } catch (error) {
//      console.log("Erroe",error)
//      throw error
//    }
// }
// )
// ()