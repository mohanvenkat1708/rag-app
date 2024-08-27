import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat'; // Import your Chat component
import AdminReport from './components/AdminReports'; // Import the AdminReport component
import FileUpload from './components/FileUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/admin-reports" element={<AdminReport />} />
        <Route path="/file-upload" element={<FileUpload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
