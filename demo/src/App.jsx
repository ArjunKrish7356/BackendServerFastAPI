import { useState, useRef } from 'react';
import './App.css';

export default function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true); 

    try {
      const res = await fetch('http://localhost:8000/items/', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        setUploadStatus('File has been uploaded successfully.');
        setFile(null); 
        fileInputRef.current.value = ''; 
      } else {
        setUploadStatus('Failed to upload file.');
      }
    } catch (err) {
      console.error(err);
      setUploadStatus('Failed to upload file.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <input 
        type='file' 
        onChange={handleFileChange} 
        ref={fileInputRef} 
      />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}