import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat'; // Import your Chat component
import AdminReport from './components/AdminReports'; // Import the AdminReport component
import FileUpload from './components/FileUpload';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/admin-reports" element={<AdminReport />} />
        <Route path="/file-upload" element={<FileUpload/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedRoute />} />
        <Route path='/admin-panel' element={<AdminPanel/>} />
      </Routes>
    </Router>
  );
}

export default App;
