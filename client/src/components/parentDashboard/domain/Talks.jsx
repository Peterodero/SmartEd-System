import { useState, useEffect } from 'react';
import '../styles/Talks.css';

const MessageTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // this will fetch teachers from an API
  
  useEffect(() => {
    const fetchTeachersAndMessages = async () => {
      setIsLoading(true);
      try {
        const teachersResponse = await fetch('/api/teachers'); // Replace with your API endpoint
        const messagesResponse = await fetch('/api/messages'); // Replace with your API endpoint

        if (!teachersResponse.ok || !messagesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const teachersData = await teachersResponse.json();
        const messagesData = await messagesResponse.json();

        setTeachers(teachersData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachersAndMessages();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedTeacher || !messageContent.trim()) return;

    try {
      const response = await fetch('/api/messages', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId: parseInt(selectedTeacher),
          content: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const newMessage = await response.json(); // Assuming the backend returns the new message

      setMessages([...messages, newMessage]);
      setMessageContent('');
      setMessageSent(true);

      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const filteredMessages = selectedTeacher
    ? messages.filter((message) => message.teacherId === parseInt(selectedTeacher))
    : [];
  return (
    <div className="message-container">
      <h1>Message Teachers</h1>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="message-content">
          <div className="teacher-selection">
            <label htmlFor="teacher-select">Select Teacher:</label>
            <select
              id="teacher-select"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Choose a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.subject})
                </option>
              ))}
            </select>
          </div>

          {selectedTeacher && (
            <>
              <div className="message-history">
                <h2>Conversation with {getTeacherName(parseInt(selectedTeacher))}</h2>

                {filteredMessages.length > 0 ? (
                  <div className="message-list">
                    {filteredMessages.map(message => (
                      <div
                        key={message.id}
                        className={`message-bubble ${message.sender === 'parent' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">{message.content}</div>
                        <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-messages">No previous messages</p>
                )}
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <div className="form-group">
                  <label htmlFor="message-content">New Message:</label>
                  <textarea
                    id="message-content"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="send-button">Send Message</button>

                {messageSent && (
                  <div className="message-success">Message sent successfully!</div>
                )}
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageTeacher; 