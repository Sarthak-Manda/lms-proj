import React, { useContext } from 'react'
import { AppContext } from ' .. / .. /context/AppContext';
import { assets } from '../../assets/assets';

const Sidebar = () => {

const { isEducator } = useContext(AppContext);

const menuItems = [
      { name: 'Dashboard', path: '/educator', icon: assets. home_icon },
      { name: 'Add Course', path: '/educator/add-course', icon: assets. add_icon },
      { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
      { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
];
  return isEducator && (
    <div>
      <h1> edu sidebar </h1>
    </div>
  )
}

export default Sidebar
