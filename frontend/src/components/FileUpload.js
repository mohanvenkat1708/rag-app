import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import the CSS file

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return; // Do nothing if no file selected

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setSuccess(null);
        setError(null);

        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('File uploaded successfully!');
        } catch (err) {
            setError('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload Text File</h2>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default FileUpload;
