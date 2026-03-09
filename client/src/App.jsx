import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/home'
import CourseList from './pages/students/courseList'
import CourseDetails from './pages/students/courseDetails'
import loading from './components/students/loading'
import Educator from './pages/educator/educator'
import Dashboard from './pages/educator/dashboard'
import AddCourse from './pages/educator/addCourse'
import StudentsEnrolled from './pages/educator/studentsEnrolled'
import MyCourses from './pages/educator/myCourses'
import Navbar from './components/students/Navbar'
import MyEnrollment from './pages/students/myEnrollment'
import Player from './pages/students/player'

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');
  return (
    <div className = 'text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />} {/* Show Navbar only if it's not an educator route */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list'element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollment />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<loading />} />
        <Route path = '/educator' element = {<Educator />}>
             <Route path = 'educator' element = {<Dashboard />}/>
             <Route path = 'add-course' element = {<AddCourse />}/>
             <Route path = 'my-courses' element = {<MyCourses />}/>
             <Route path = 'students-enrolled' element = {<StudentsEnrolled />}/> 
        </Route>
        {/* Add more routes as needed */}
        
      </Routes>
    </div>
  )
}

export default App