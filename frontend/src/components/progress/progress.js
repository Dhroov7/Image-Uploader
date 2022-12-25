import React from 'react';
import './progress.css';

export default function ProgressBar() {
    return (
        <div className='container'>
            <h2 className='bold-heading'>Uploading...</h2>
            <div className='parent-bar'>
                <div className='child-bar'></div>
            </div>
        </div>
    )
}
