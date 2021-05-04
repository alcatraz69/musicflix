import React from 'react'
import LikeSection from './LikeSection/LikeSection'
import PlaylistSec from './PlaylistSection/PlaylistSec'
import './Library.css'

function LibraryPage() {

    return (
        <div className="library-page wrapper">
            <div className="divider"></div>
            <LikeSection />
            <div className="divider"></div>
            <PlaylistSec />
            <div className="divider"></div>
        </div>
    )
}

export default LibraryPage
