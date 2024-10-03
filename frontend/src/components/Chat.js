import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import './Chat.css'; 

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [reporting, setReporting] = useState(null);
    const [reportText, setReportText] = useState('');
    const [showReportForm, setShowReportForm] = useState(false);
    const [user, setUser] = useState(null); // State to store decoded user info

    useEffect(() => {
        
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('authToken');
                console.log(token+"Sorry !");
                if (token) {
                    // Decode user information from token
                    const decodedUser = jwtDecode(token).username;
                    console.log("Okay!");
                    console.log(decodedUser+"LOL");
                    setUser(decodedUser); // Set user info in state
                }

                // Fetch messages with authorization token
                const response = await axios.get('http://localhost:5000/api/messages', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ensure correct syntax
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                }
            }
        };

        fetchMessages();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString(undefined, options);
    };

    const sendMessage = async () => {
        if (input.trim() === '') return;

        try {
            const token = localStorage.getItem('authToken');
            console.log(token+"hi!");
            // Send message with authorization token
            const response = await axios.post(
                'http://localhost:5000/api/messages',
                {
                    user: user, // Use decoded username from token
                    username: "NO user",
                    message: input,
                    timestamp: new Date().toISOString(),
                    sessionId: token,
                    //username: "No user"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ensure correct syntax
                    }
                }
            );

            console.log('Message sent successfully:', response.data);
            setInput('');
            
            // Fetch messages again to update the list
            const messagesResponse = await axios.get('http://localhost:5000/api/messages', {
                headers: {
                    'Authorization': `Bearer ${token}` // Ensure correct syntax
                }
            });
            setMessages(messagesResponse.data);
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (!isTyping) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1000);
        }
    };

    const handleReportClick = (messageId) => {
        setReporting(messageId);
        setShowReportForm(true);
    };

    const submitReport = async () => {
        if (!reportText.trim()) return;

        try {
            const token = localStorage.getItem('authToken');

            // Send report with authorization token and user ID from decoded token
            await axios.post(
                'http://localhost:5000/api/reporting',
                {
                    messageId: reporting,
                    userId: user.id, // Use user ID from decoded token
                    reportText
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ensure correct syntax
                    }
                }
            );

            console.log('Report submitted successfully');
            setReportText('');
            setShowReportForm(false);
            setReporting(null);
        } catch (error) {
            console.error('Error submitting report:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                Chat with Us
            </div>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.user === user?.username ? 'user1' : 'user2'}`}
                    >
                        <strong>{msg.user}</strong>: {msg.message}
                        <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                        <button className="report-button" onClick={() => handleReportClick(msg._id)}>Report</button>
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">User is typing...</div>}
            </div>
            <div className="input-container">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            {showReportForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="modal-close" onClick={() => setShowReportForm(false)}>×</button>
                        <h2>Report Issue</h2>
                        <textarea
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            placeholder="Describe the issue..."
                        />
                        <button onClick={submitReport}>Submit Report</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
