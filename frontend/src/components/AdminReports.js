import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './report.css';

const AdminReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reports');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="admin-reports-container">
            <h1 className="title">User Reports</h1>
            <div className="table-wrapper">
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Message ID</th>
                            <th>User ID</th>
                            <th>Report Text</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length ? (
                            reports.map((report) => (
                                <tr key={report._id}>
                                    <td>{report.messageId}</td>
                                    <td>{report.userId}</td>
                                    <td>{report.reportText}</td>
                                    <td>{new Date(report.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-reports">No reports available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReports;
