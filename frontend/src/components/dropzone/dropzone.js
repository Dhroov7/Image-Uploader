import React, { useCallback, useState, useRef } from 'react';
import ProgressBar from '../progress/progress';
import './dropzone.css';
import { useDropzone } from 'react-dropzone';
import imageUploadImage from '../../images/image.svg';
import successfulImage from '../../images/success.jpg';
import axios from 'axios';
function DropZone({ in: inProp }) {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [progressRender, setProgressRender] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach(async (file) => {
            let formData = new FormData()

            formData.append("file", file);
            const response = await axios.post("http://localhost:9898/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: data => {
                    setProgressRender(true);
                },
            });
            if (response.status === 200) {
                setFileUploaded(true);
                setProgressRender(false);
            }
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
        }
    });

    return (
        <div>
            {progressRender ? <ProgressBar /> : <>
                {fileUploaded ? (
                    <div className='container'>
                        <div className='success-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='check-icon'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className='primary-heading'>Uploaded Successfully!</h2>
                        <div className='success-image-container'>
                            <img className='success-image' src={successfulImage} />
                        </div>
                        <div className='link-container'>
                            <p>https://images.yourdomain.com/photo</p>
                            <button className='primary-button'>Copy Link</button>
                        </div>
                    </div>
                ) : (
                    <div className={isDragActive ? 'container image-uploader blur-container' : 'container image-uploader'}>
                        <h2 className='primary-heading'>Upload your image</h2>
                        <p className='file-size-text'>File should be Jpeg, Png...</p>
                        <div className='image-drop-container' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={imageUploadImage} className='uploader-image-svg'></img>
                            <p>Drag
                                Drop & your image here</p>
                        </div>
                        <p className='or-text'>Or</p>
                        <button className='primary-button'>Choose a file</button>
                    </div>
                )}

            </>}
        </div>
    );
}

export default DropZone;