import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/students/footer'
import Rating from '../../components/students/rating'



const Player = () => {
  const  {enrolledCourses , calculateChapterTime} = useContext(AppContext)
  const {courseId} = useParams()
  const [courseData,setCourseData] = useState(null)
  const [openSections,setOpenSections] = useState({})
  const [playerData,setPlayerData] = useState(null)
  const getCourseData = ()=> {
    enrolledCourses.map((course) =>{
      if(course._id == courseId){
        setCourseData(course)
      }
    })
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  useEffect(() => {
  getCourseData()
}, [enrolledCourses])
  return (
    
<>    
    <div className = 'p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-30'>
      {/*left col*/}
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course structure</h2>
          <div className='pt-4'>
              {courseData &&courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded-md overflow-hidden'>
                  <div 
                    className='flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-gray-50 hover:bg-gray-100 transition'
                    onClick={() => toggleSection(index)}
                  >
                    <div className='flex items-center gap-2'>
                      <img 
                        src={assets.down_arrow_icon} 
                        alt="arrow" 
                        className={`transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-xs md:text-sm text-gray-600'>
                      {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                    </p>
                  </div>
  
                  {/* Lecture List */}
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <ul className='list-none border-t border-gray-200'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className='flex items-center justify-between px-10 py-3 border-b border-gray-100 last:border-0'>
                          <div className='flex items-center gap-2'>
                            <img src={false ? assets.blue_tick_icon: assets.play_icon} alt="play" className='w-4 h-4' />
                            <p className='text-sm text-gray-700'>{lecture.lectureTitle}</p>
                          </div>
                          <div className='flex items-center gap-3'>
                            {lecture.lectureUrl && <p onClick={()=> setPlayerData({
                              ...lecture,chapter: index + 1 , lecture: i + 1
                            })}
                              className='text-blue-600 
                            text-xs font-medium cursor-pointer'>watch</p>}
                            <p className='text-xs text-gray-500'>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'], round: true })}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-2 py-3 mt-10'>
              <h1 className='text-xl font-bold'>Rate this Course</h1>
              <Rating initialrating={0}/>
            </div>
      </div>
      {/*right col*/}
      <div className = 'md:mt-10'>
        {playerData ? (
          <div>
           <YouTube videoId = {playerData.lectureUrl.split('/').pop()} iframeClassName = 'w-full aspect-video'/>
           <div className='flex justify-between items-center mt-1'>
            <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
            <button className='text-blue-600'>{false ? 'Completed' : 'Mark Complete' }</button>
           </div>
          </div>
        ) 
        :
        <img src = {courseData ? courseData.courseThumbnail : 'woo'} alt = 'woo' />
      }
      </div>
    </div>
    <Footer />
    
</>
  )
}

export default Player
