// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/Cloudinary.js";

// // let coverImageOrLocalPath;
// let avatarOrLocalPath;



// const registerUser = asyncHandler(async (req, res, next) => {
// //  res.status(200).json({
// //     message: "ok"

// //   })


// // for regitration of a new user 
// // get user details from req.body || frontend 
// // validate user details - not empty
// // check if user already exists in the database using findOne method
// // check for images , check for avatar
// // upload them to cloudinary
// // create use object - create entry in db
// // remove password and referesh token field from response
// // check for user creation 
// // return res
// // catch errors

// const {fullname,email,username,password} = req.body
// console.log(fullname);
// console.log(email);

// if(
//     [fullname,email,username,password].some((field)=>(field?.trim()===""))
// ){
//     throw new ApiError(400,"All fields are required")
// }

//    const existingUser =await User.findOne({
//     $or : [{email},{username}]
//    })
//     if(existingUser){
//         throw new ApiError(409,"User already exists")
//     }
//      // set path for create a url for th e image 
//     avatarOrLocalPath = req.files?.avatar[0]?.path
//     let coverImageLocalPath;
//     if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
//         coverImageLocalPath = req.files.coverImage[0].path
//     }

//     // if(!avatarOrLocalPath){
//     //     throw new ApiError(400,"Avatar is required")
//     // }
   
//     const avatar = await uploadOnCloudinary(avatarOrLocalPath);
//     const coverImage = await uploadOnCloudinary(coverImageLocalPath);
//     // if(!avatar) throw new ApiError(400,"Avatar upload failed")
        
//     // create user object
//     const user = User.create({
//         fullname,
//         avatar : avatar.url,
//         coverImage : coverImage?.url || "",
//         email,
//         password,
//         username : username.toLowerCase(),
//     })
//     const createduser = await User.findById(user._id).select(
//         "-password -refershToken"
//     )
//     if (!user) {
//         throw new ApiError(500, "User creation failed check and register again");
//     }
    
//     return await res.status(201).json({
//         message: "User created successfully",
//         createduser,
//     });
    
// });


// export {registerUser}



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, email, username, password } = req.body;

    // Check if any required field is empty
    if ([fullname, email, username, password].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // Extract paths for avatar and cover image from request files
    let avatarOrLocalPath = req.files?.avatar?.[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    // Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarOrLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // Create user object with avatar and coverImage URLs
    const avatarUrl = avatar ? avatar.url : null;
    const coverImageUrl = coverImage ? coverImage.url : null;

    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatarUrl,
        coverImage: coverImageUrl || "", // Set to empty string if coverImage is null
    });

    // Check if user is successfully created
    if (!user) {
        throw new ApiError(500, "User creation failed. Please check and register again.");
    }

    // Fetch the created user excluding password and refreshToken fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // Return success response with created user
    return res.status(201).json({
        message: "User created successfully",
        user: createdUser,
    });
});

export { registerUser };
