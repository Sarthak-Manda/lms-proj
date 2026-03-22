import React, { useState, useEffect } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchEnrolledStudents()
  }, [])

  return enrolledStudents ? (
    <div className='min-h-screen p-4 md:p-8'>
      <div className='max-w-5xl'>

        <h2 className='text-xl font-semibold text-gray-700 mb-5'>Students Enrolled</h2>

        <div className='border border-gray-200 rounded-md overflow-hidden'>
          <table className='w-full text-sm text-gray-600'>
            <thead className='bg-gray-100 text-left'>
              <tr>
                <th className='px-4 py-3 font-medium'>#</th>
                <th className='px-4 py-3 font-medium'>Student Name</th>
                <th className='px-4 py-3 font-medium'>Course Title</th>
                <th className='px-4 py-3 font-medium'>Date</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((item, index) => (
                <tr key={index} className='border-t border-gray-200 hover:bg-gray-50 transition-colors'>
                  <td className='px-4 py-3 text-gray-500'>{index + 1}</td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={item.student.imageUrl}
                        alt={item.student.name}
                        className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                      />
                      <span className='font-medium text-gray-700'>{item.student.name}</span>
                    </div>
                  </td>
                  <td className='px-4 py-3 text-gray-600'>{item.courseTitle}</td>
                  <td className='px-4 py-3 text-gray-500'>
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled