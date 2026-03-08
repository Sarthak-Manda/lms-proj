import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/appContext';  

const Navbar = () => {
  const {navigate,isEducator} = useContext(AppContext)
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');
  const { openSignIn } = useClerk();
  
  // Destructure isSignedIn to get a true/false value
  const { isSignedIn } = useUser();

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick = {() => navigate('/')} src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer' />

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          
          <span className="text-gray-400">|</span> 
          {/* Use isSignedIn here */}
          { isSignedIn && 
          <> 
          <button onClick = {() => {{navigate('/educator')}}}>{isEducator ? 'Educator dashboard' : 'Become Educator'}</button>
          <Link to='/my-enrollments'>My Enrollments</Link>  
          </>
          }
        </div>
         {/* Use isSignedIn here to toggle the button */}
         {isSignedIn ? <UserButton/> :
          <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>
            Create account
          </button>}
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          { isSignedIn && 
          <> 
          <button onClick = {() => {{navigate('/educator')}}}>{isEducator ? 'Educator dashboard' : 'Become Educator'}</button>
          <Link to='/my-enrollments'>My Enrollments</Link>
          </>
          }
        </div>
        {
          isSignedIn ? <UserButton/>
          : <button onClick={() => openSignIn()}>
          <img src={assets.user_icon} alt="user icon" className='w-8 h-8 rounded-full' />
        </button>
        }
      </div>
    </div>  
  )
}

export default Navbar