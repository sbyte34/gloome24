import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const ActivityLogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder data for user activity logs
  const activityData = [
    { id: 1, type: 'Call', details: 'Incoming call from John Doe', timestamp: '2023-01-01T10:30:00' },
    { id: 2, type: 'Message', details: 'Sent a message to Jane Doe', timestamp: '2023-01-02T14:45:00' },
    { id: 3, type: 'Live Session', details: 'Participated in a live session', timestamp: '2023-01-03T18:15:00' },
    // Add more activity entries as needed
  ];

  // Filter activities based on type
  const callActivities = activityData.filter(activity => activity.type === 'Call');
  const messageActivities = activityData.filter(activity => activity.type === 'Message');
  const liveSessionActivities = activityData.filter(activity => activity.type === 'Live Session');

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="p-4">
          <h1 className="text-3xl font-bold mb-6">User Activity Logs</h1>

          {/* Call Activities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Call Activities</h2>
            {callActivities.map((activity) => (
              <div key={activity.id} className="bg-white p-4 rounded-md shadow-md mb-2">
                <p className="font-semibold text-blue-600 mb-2">{activity.type}</p>
                <p className="text-gray-800 mb-2">{activity.details}</p>
                <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Message Activities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Message Activities</h2>
            {messageActivities.map((activity) => (
              <div key={activity.id} className="bg-white p-4 rounded-md shadow-md mb-2">
                <p className="font-semibold text-blue-600 mb-2">{activity.type}</p>
                <p className="text-gray-800 mb-2">{activity.details}</p>
                <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Live Session Activities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Live Session Activities</h2>
            {liveSessionActivities.map((activity) => (
              <div key={activity.id} className="bg-white p-4 rounded-md shadow-md mb-2">
                <p className="font-semibold text-blue-600 mb-2">{activity.type}</p>
                <p className="text-gray-800 mb-2">{activity.details}</p>
                <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityLogs;
