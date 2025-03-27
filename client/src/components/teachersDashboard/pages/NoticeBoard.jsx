import React, { useState } from 'react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Meeting Announcement', content: 'There will be a faculty meeting tomorrow at 10 AM.', date: new Date('2024-03-15') },
    { id: 2, title: 'Library Closure', content: 'The library will be closed for maintenance on Friday.', date: new Date('2024-03-22') },
    { id: 3, title: 'Sports Day', content: 'Annual Sports Day will be held on April 5th.', date: new Date('2024-04-05') },
  ]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', date: new Date() });
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [editedNotice, setEditedNotice] = useState({ title: '', content: '', date: new Date() });

  const handleInputChange = (e, field) => {
    setNewNotice({ ...newNotice, [field]: e.target.value });
  };

  const handleDateChange = (date) => {
    setNewNotice({ ...newNotice, date: date });
  };

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.content) {
      setNotices([...notices, { id: Date.now(), ...newNotice }]);
      setNewNotice({ title: '', content: '', date: new Date() });
    }
  };

  const handleRemoveNotice = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  const handleEditNotice = (id) => {
    const noticeToEdit = notices.find((notice) => notice.id === id);
    setEditedNotice({ ...noticeToEdit });
    setEditingNoticeId(id);
  };

  const handleSaveEdit = () => {
    setNotices(notices.map((notice) =>
      notice.id === editingNoticeId ? { ...editedNotice } : notice
    ));
    setEditingNoticeId(null);
    setEditedNotice({ title: '', content: '', date: new Date() });
  };

  const handleCancelEdit = () => {
    setEditingNoticeId(null);
    setEditedNotice({ title: '', content: '', date: new Date() });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
      
      <div
        className={`transition-margin-left duration-300 ease-in-out p-4 w-full`}
      >
      
        <main className="flex flex-col p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Notice Board</h1>
            <button
              onClick={handleAddNotice}
              className="bg-purple-700 rounded-md p-2 flex items-center"
            >
              <img src="src/icons/plus-icon.png" alt="plus-icon" /> Add Notice
            </button>
          </header>

          {/* Add Notice Form */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Add New Notice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newNotice.title}
                onChange={(e) => handleInputChange(e, 'title')}
                className="bg-gray-700 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Content"
                value={newNotice.content}
                onChange={(e) => handleInputChange(e, 'content')}
                className="bg-gray-700 rounded-md p-2"
              />
              <input
                type="date"
                value={newNotice.date.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="bg-gray-700 rounded-md p-2"
              />
            </div>
          </div>

          {/* Notice List */}
          <div className="bg-gray-900 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4">Notice List</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Title</th>
                  <th className="text-left">Content</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id}>
                    <td>
                      {editingNoticeId === notice.id ? (
                        <input
                          type="text"
                          value={editedNotice.title}
                          onChange={(e) => setEditedNotice({ ...editedNotice, title: e.target.value })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        notice.title
                      )}
                    </td>
                    <td>
                      {editingNoticeId === notice.id ? (
                        <input
                          type="text"
                          value={editedNotice.content}
                          onChange={(e) => setEditedNotice({ ...editedNotice, content: e.target.value })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        notice.content
                      )}
                    </td>
                    <td>
                      {editingNoticeId === notice.id ? (
                        <input
                          type="date"
                          value={editedNotice.date.toISOString().split('T')[0]}
                          onChange={(e) => setEditedNotice({ ...editedNotice, date: new Date(e.target.value) })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        formatDate(notice.date)
                      )}
                    </td>
                    <td className="flex space-x-2">
                      {editingNoticeId === notice.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="text-green-500">Save</button>
                          <button onClick={handleCancelEdit} className="text-red-500">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditNotice(notice.id)} className="text-blue-500">
                           <img src="src/icons/pen-icon.webp" alt="pen-icon" 
                           height={20}
                           width={20}/>
                          </button>
                          <button onClick={() => handleRemoveNotice(notice.id)} className="text-red-500">
                           <img src="src/icons/trash-icon.png" alt="trash-icon" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NoticeBoard;