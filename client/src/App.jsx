import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/home'
import CourseList from './pages/students/courseList'
import CourseDetails from './pages/students/courseDetails'
import Loading from './components/students/loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/dashboard'
import AddCourse from './pages/educator/addCourse'
import StudentsEnrolled from './pages/educator/studentsEnrolled'
import MyCourses from './pages/educator/myCourses'
import Navbar from './components/students/Navbar'
import MyEnrollment from './pages/students/myEnrollment'
import Player from './pages/students/player'
import "quill/dist/quill.snow.css";

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollment />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route index element={<Dashboard/>} />          {/* ✅ renders at /educator */}
          <Route path='add-course' element={<AddCourse/>} />
          <Route path='my-courses' element={<MyCourses/>} />
          <Route path='students-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App