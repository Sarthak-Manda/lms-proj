import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
 ;
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className='min-h-screen w-16 md:w-64 border-r border-gray-700 bg-white flex flex-col py-4'>
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors duration-200 
            ${isActive
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <img src={item.icon} alt={item.name} className='w-5 h-5 flex-shrink-0' />
          <p className='hidden md:block text-sm'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;