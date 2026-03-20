import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { dummyDashboardData, assets } from '../../assets/assets'
import Loading from '../../components/students/Loading'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const { currency } = useContext(AppContext)

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>

        {/* Stats Cards */}
        <div className='flex flex-wrap gap-5 items-center'>

          {/* Total Enrollments */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>Total Enrolments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.my_course_icon} alt="courses_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="earning_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{dashboardData.totalEarnings}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Enrolled Students Table */}
        <div>
          <h2 className='text-lg font-medium text-gray-700 pb-3'>Latest Enrollments</h2>
          <table className='w-full text-sm text-gray-600 border border-gray-200 rounded-md overflow-hidden'>
            <thead className='bg-gray-100 text-left'>
              <tr>
                <th className='px-4 py-3'>#</th>
                <th className='px-4 py-3'>Student Name</th>
                <th className='px-4 py-3'>Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className='border-t border-gray-200 hover:bg-gray-50'>
                  <td className='px-4 py-3'>{index + 1}</td>
                  <td className='px-4 py-3 flex items-center gap-2'>
                    <img src={item.student.imageUrl} alt="" className='w-8 h-8 rounded-full' />
                    {item.student.name}
                  </td>
                  <td className='px-4 py-3'>{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard