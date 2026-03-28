import express from 'express'
import { addCourse, updateRoleEducator, getEducatorCourses } from '../controllers/educatorControllers.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import upload from '../configs/multer.js'

const educatorRouter = express.Router()

educatorRouter.get('/update-role', updateRoleEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses)  // ← fixed

export default educatorRouter;