import React from 'react'
// import CourseSection from '../../Components/CourseSection/CourseSection'
import LikeSection from './LikeSection/LikeSection'
// import PlaylistSection from '../../Components/PlaylistSection/PlaylistSection'
// import {courseList} from '../../Data/Data.js'
import './Library.css'

function LibraryPage() {

    return (
        <div className="library-page wrapper">
            {/* <CourseSection
                courseList={courseList} /> */}
            <div className="divider"></div>
            <LikeSection />
            <div className="divider"></div>
            {/* <PlaylistSection />
            <div className="divider"></div> */}
        </div>
    )
}

export default LibraryPage
