import React, { useState } from 'react'
import { createContext } from 'react';
import { dummyCourses } from '../assets/assets'; // Importing dummy courses data
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // This is where you'll eventually put your state (e.g., const [user, setUser] = useState(null))
    const currency = import.meta.env.VITE_CURRENCY || '$'; // Accessing the currency from environment variables
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]) // Example state for courses, you can replace it with actual data fetching logic
    const [isEducator, setIsEducator] = useState(true)

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses) // Clear existing courses before fetching new ones
    }
    //fn to create rating
    const calculateRating = (course) =>{
        if(course.courseRatings.length === 0){
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating  += rating.rating
        })
        return totalRating / course.courseRatings.length;
    }

    //fn to cal course chapter time

    const calculateChapterTime = (chapter) => 
    {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ['h','m']})
    }

    //fn to cal course duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter)=> chapter.chapterContent.map
        ((lecture)=> time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, {units: ['h','m']})
    }

    //fn to cal no of lectures in a course
    
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }
    useEffect(() => {
        fetchAllCourses() // Fetch courses when the component mounts
    }, [])
    const value = {
        // Add shared data here later
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,
        calculateChapterTime,calculateCourseDuration,calculateNoOfLectures
    };
    console.log("PROVIDING VALUE:", value);

    return (
        <AppContext.Provider value={value}> {/* Changed from props.value to value */}
            {props.children}
        </AppContext.Provider>
    );
};