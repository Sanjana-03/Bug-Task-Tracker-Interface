import React, { useEffect, useState } from 'react';

const ManagerHome = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const updateStatus = (id, status) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending_approval');

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manager Dashboard</h2>

      <h3 className="text-xl font-semibold mb-2">Pending Approval Tasks</h3>
      {pendingTasks.length === 0 ? (
        <p className="text-gray-600 mb-4">No tasks awaiting approval.</p>
      ) : (
        <ul>
          {pendingTasks.map(task => (
            <li key={task.id} className="border p-3 mb-3 rounded bg-yellow-100">
              <h4 className="font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <div className="mt-2 flex gap-3">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(task.id, 'closed')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(task.id, 'open')}
                >
                  Reopen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-2">All Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border p-3 mb-2 rounded">
            <h4 className="font-bold">{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: <span className="italic">{task.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerHome;
