import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/appContext'
import Loading from '../../components/students/loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({}) // For accordion toggle
   const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false) 
    const [playerData, setPlayerData] = useState(null) 

  const { 
    allCourses, 
    calculateRating, 
    calculateChapterTime,
    currency,
    calculateCourseDuration,
    calculateNoOfLectures
  } = useContext(AppContext) 

  const fetchCourseData = async () => {
    const course = allCourses.find(course => course._id === id);
    setCourseData(course);
  }

  useEffect(() => {
    fetchCourseData()
  }, [allCourses, id])

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return courseData ? (
    <div className='relative flex flex-col-reverse md:flex-row gap-10 items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      
      {/* Background Decor */}
      <div className='absolute top-0 left-0 w-full h-[500px] -z-10 bg-gradient-to-b from-cyan-100/70'></div>

      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-[36px] md:leading-[44px] text-[26px] leading-[36px] font-semibold text-gray-800'>
          {courseData.courseTitle}
        </h1>

        <p 
          className='pt-4 md:text-base text-sm' 
          dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0, 200)}}
        ></p>

        {/* Ratings Section */}
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p className='font-semibold text-orange-500'>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img 
                key={i} 
                src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} 
                alt='' 
                className='w-3.5 h-3.5' 
              />
            ))}
          </div>
          <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
          <p>{courseData.enrolledStudents?.length || 0} students</p>
        </div>

        <p className='text-sm'>Course By <span className='text-blue-600 underline font-medium'>Pikachu</span></p>
        
        {/* Course Structure (Accordion) */}
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-4'>
            {courseData.courseContent.map((chapter, index) => (
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
                          <img src={assets.play_icon} alt="play" className='w-4 h-4' />
                          <p className='text-sm text-gray-700'>{lecture.lectureTitle}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                          {lecture.isPreviewFree && <p onClick={()=> setPlayerData({
                            videoId: lecture.lectureUrl.split('/').pop()
                          })}
                            className='text-blue-600 
                          text-xs font-medium cursor-pointer'>Preview</p>}
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
        </div>
        <div className = 'py-20 text-sm md:text-default'>
        <h3 className = 'text-xl font-semibold tex-gray-800'>
          Couse Description
        </h3>
        <p 
          className='pt-3 rich-text' 
          dangerouslySetInnerHTML={{__html: courseData.courseDescription}}
        ></p>
      </div>
        
      </div>
      

      {/* Right Side Column (Where the Pricing/Video Card usually goes) */}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-tmd : rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
        {
          playerData ? 
              <YouTube videoId = {playerData.videoId} options={{playerVars: 
                {autoplay: 1}}} iframeClassName = 'w-full aspect-video'></YouTube>
              :<img src = {courseData.courseThumbnail} alt="Course Thumbnail" 
              className='w-full h-auto rounded-md shadow-md' />
        }
        
        <div className=' p-6'>
          <div className = 'flex items-center gap-2'>
            <img className = 'w-3.5'  src = {assets.time_left_clock_icon} alt
               = "time left clocl icon" />
          
          <p className = 'text-red-00'> 
            <span className = 'font-medium' > 4 days</span> left at this price!</p>
          </div>
          <div className='flex gap-3 items-center pt-2'>
<p className='text-gray-800 md: text-4x1 text-2x1 font-semibold' >
{currency} { (courseData. coursePrice - courseData. discount * courseData.
coursePrice / 100).toFixed(2)}</p>
<p className='md: text-lg text-gray-500 line-through'>{ currency}
{courseData. coursePrice}</p>
<p className='md: text-1g text-gray-500'>{ courseData. discount}% off</p>
</div>

<div className='flex items-center text-sm md: text-default gap-4 pt-2
md: pt-4 text-gray-500' >
<div className= ' flex items-center gap-1' >
<img src={assets.star} alt="star icon" />
<p>{calculateRating(courseData)}</p>
</div>

<div className = 'h-4 w-px bg-gray-500/40'></div>

<div className= ' flex items-center gap-1' >
<img src={assets.time_clock_icon} alt="clock icon" />
<p>{calculateCourseDuration(courseData)}</p>
</div>

<div className = 'h-4 w-px bg-gray-500/40'></div> 

<div className= ' flex items-center gap-1' >
<img src={assets.lesson_icon} alt="clock icon" />
<p>{calculateNoOfLectures(courseData)} Lessons </p>
</div>
</div>

<button className ='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white
 font-medium'>{isAlreadyEnrolled ? 'already enrolled' : 'enroll now'}
</button>

<div>
  <p className='md:text-xl text-lg font-medium'>What's In the Course</p>
  <ul className='ml-4 pt-4 text-sm md:text-default list-disc text-gray-500'>
    <li>Lifetime access with free updates. </li>
    <li>Step-by-step, hands-on project guidance. </li>
    <li>Downloadable resources and source code. </li>
    <li>Quizzes to test your knowledge .</li>
     <li>Certificate of completion </li>
  </ul>
</div>
        </div>
         {/* You can add your Course Card component here later */}
      </div>
    </div>
  ) : <Loading />
}

export default CourseDetails