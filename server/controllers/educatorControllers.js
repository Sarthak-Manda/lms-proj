import { clerkClient, getAuth } from '@clerk/express'
import Course from '../models/course.js'
import {v2 as cloudinary} from 'cloudinary'

export const updateRoleEducator = async (req, res) => {
    try {
        const { userId } = getAuth(req)
        console.log("User ID:", userId)

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })
        res.json({ success: true, message: 'You can publish course now' })

    } catch (error) {
        res.json({ success: false, messge: error.message })
    }
}

// Add new Course 
export const addCourse = async (req,res) =>{
    try {
       const {courseData } = req.body
       const imageFile = req.imageFileconst 
       const educatorId = req.auth.userId

       if(!imageFile){
        return res.json({success: false , 
            message: 'thumbnail Not attached'})
       }

       const parsedCourseData = await JSON.parse(courseData)
       parsedCourseData.educator = educatorId

       const newCourse = await Course.create(parsedCourseData)
       const imageUpload = await cloudinary.uploader.upload(imageFile.path)
       newCourse.courseThumbnail = imageUpload.secure_url
       await newCourse.save()

       res.json({success: true, message: error.message})
    }catch(error){
        res.json({success: false , message: error.message})

    }
} 



// get educator courses 
export const getEducatorCourses = async (req,res) => {
    try{
        const educator = req.auth.userId
        const courses = await Course.find({educator})

        res.json({success: true, courses})
    }catch(error){
        res.json({success: false , message: error.messsage})
    }
}

//get educator dashboard data 
// ( total earning , enrolled students , no of courses)

export const educatorDashboardData = async ()=>{
    try{
        const educator = req.auth.userId;
        const courses = await Course.find({educator})
        const totalEarning = courses.length

    }catch(error){

    }
}