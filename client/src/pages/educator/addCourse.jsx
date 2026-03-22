import React, { useState, useRef, useEffect } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurentChapterId] = useState(null)

  const [lectureDetails, setLEctureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter title')
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        }
        setChapters([...chapters, newChapter])
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurentChapterId(chapterId)
      setShowPopup(true)
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, i) => i !== lectureIndex),
            }
          }
          return chapter
        })
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid(),
          }
          return { ...chapter, chapterContent: [...chapter.chapterContent, newLecture] }
        }
        return chapter
      })
    )
    setShowPopup(false)
    setLEctureDetails({ lectureTitle: '', lectureDuration: '', lectureUrl: '', isPreviewFree: false })
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 p-6 md:p-10'>
      <div className='max-w-2xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-8'>Create New Course</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>

          {/* Course Title */}
          <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4'>
            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Basic Info</h2>
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Course Title</label>
              <input
                onChange={e => setCourseTitle(e.target.value)}
                value={courseTitle}
                type='text'
                placeholder='e.g. Complete Web Development Bootcamp'
                className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'
                required
              />
            </div>

            {/* Course Description */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Course Description</label>
              <div
                ref={editorRef}
                className='border border-gray-300 rounded-lg text-sm text-gray-700 min-h-32'
              />
            </div>
          </div>

          {/* Pricing & Thumbnail */}
          <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4'>
            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Pricing & Media</h2>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Course Price ($)</label>
                <input
                  onChange={e => setCoursePrice(e.target.value)}
                  value={coursePrice}
                  type="number"
                  placeholder='0'
                  className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-40'
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Discount (%)</label>
                <input
                  onChange={e => setDiscount(e.target.value)}
                  value={discount}
                  type="number"
                  placeholder='0'
                  min={0}
                  max={100}
                  className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-40'
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Course Thumbnail</label>
                <label htmlFor='thumbnailImage' className='flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all'>
                  <img src={assets.file_upload_icon} alt="" className='w-5 h-5 opacity-40' />
                  <span className='text-sm text-gray-400'>Click to upload</span>
                  <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
                  <img src={image ? URL.createObjectURL(image) : ''} alt="" className={`${image ? 'w-12 h-12 object-cover rounded-md ml-auto' : 'hidden'}`} />
                </label>
              </div>
            </div>
          </div>

          {/* Chapters & Lectures */}
          <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3'>
            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Course Content</h2>

            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.chapterId} className='border border-gray-200 rounded-lg overflow-hidden'>
                <div className='flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200'>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleChapter('toggle', chapter.chapterId)}>
                    <img
                      src={assets.dropdown_icon}
                      alt=""
                      width={13}
                      className={`transition-transform duration-200 ${chapter.collapsed ? '-rotate-90' : ''}`}
                    />
                    <span className='font-semibold text-sm text-gray-800'>
                      {chapterIndex + 1}. {chapter.chapterTitle}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full'>
                      {chapter.chapterContent.length} Lectures
                    </span>
                    <img
                      src={assets.cross_icon}
                      alt=""
                      className='cursor-pointer w-3.5 h-3.5 opacity-40 hover:opacity-80 transition-opacity'
                      onClick={() => handleChapter('remove', chapter.chapterId)}
                    />
                  </div>
                </div>

                {!chapter.collapsed && (
                  <div className='p-4 space-y-2'>
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className='flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg text-sm text-gray-700'>
                        <span className='flex items-center gap-2'>
                          <span className='text-xs font-semibold text-gray-400'>{lectureIndex + 1}.</span>
                          {lecture.lectureTitle}
                          <span className='text-gray-400'>·</span>
                          <span className='text-gray-500'>{lecture.lectureDuration} mins</span>
                          <span className='text-gray-400'>·</span>
                          <a href={lecture.lectureUrl} target='_blank' className='text-blue-400 hover:underline'>Link</a>
                          <span className='text-gray-400'>·</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lecture.isPreviewFree ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {lecture.isPreviewFree ? 'Free' : 'Paid'}
                          </span>
                        </span>
                        <img
                          src={assets.cross_icon}
                          alt=""
                          className='cursor-pointer w-3.5 h-3.5 opacity-40 hover:opacity-80 transition-opacity'
                          onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        />
                      </div>
                    ))}
                    <button
                      type='button'
                      className='mt-1 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors'
                      onClick={() => handleLecture('add', chapter.chapterId)}
                    >
                      + Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type='button'
              onClick={() => handleChapter('add')}
              className='w-full py-2.5 border-2 border-dashed border-blue-200 text-blue-500 text-sm font-medium rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all'
            >
              + Add Chapter
            </button>
          </div>

          <button
            type='submit'
            className='bg-black text-white text-sm font-semibold px-10 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm'
          >
            Publish Course
          </button>
        </form>
      </div>

      {/* Lecture Popup */}
      {showPopup && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative'>
            <h2 className='text-lg font-bold text-gray-800 mb-5'>Add New Lecture</h2>

            <div className='space-y-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Lecture Title</label>
                <input
                  type="text"
                  placeholder='e.g. Introduction to React'
                  className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'
                  value={lectureDetails.lectureTitle}
                  onChange={e => setLEctureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Duration (minutes)</label>
                <input
                  type="number"
                  placeholder='0'
                  className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-40'
                  value={lectureDetails.lectureDuration}
                  onChange={e => setLEctureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Lecture URL</label>
                <input
                  type="text"
                  placeholder='https://...'
                  className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'
                  value={lectureDetails.lectureUrl}
                  onChange={e => setLEctureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                />
              </div>
              <label className='flex items-center gap-3 cursor-pointer select-none'>
                <input
                  type="checkbox"
                  id='previewFree'
                  className='w-4 h-4 accent-blue-500 cursor-pointer'
                  checked={lectureDetails.isPreviewFree}
                  onChange={e => setLEctureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                />
                <span className='text-sm font-medium text-gray-700'>Is Preview Free</span>
              </label>
            </div>

            <button
              type='button'
              className='mt-6 w-full bg-blue-500 hover:bg-blue-600 
              text-white text-sm font-semibold py-2.5 rounded-lg transition-colors 
              shadow-sm'
              onClick={addLecture}
            >
              Add Lecture
            </button>

            <img
              onClick={() => setShowPopup(false)}
              src={assets.cross_icon}
              className='absolute top-5 right-5 w-4 h-4 cursor-pointer opacity-40 hover:opacity-80 transition-opacity'
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCourse