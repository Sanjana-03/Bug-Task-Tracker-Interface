import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import defaultTasks from '../store/tasks';

const DeveloperHome = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('createdAt');

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: '',
    createdAt: '',
    dueDate: '',
    timeSpent: 0,
    isTracking: false,
    trackingStart: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(defaultTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleStatusChange = (id, status) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updated);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const createdAt = new Date().toISOString().split('T')[0];
    setTasks([...tasks, { id: newId, ...newTask, createdAt, timeSpent: 0, isTracking: false, trackingStart: null }]);
    setNewTask({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
      assignee: '',
      createdAt: '',
      dueDate: '',
      timeSpent: 0,
      isTracking: false,
      trackingStart: null,
    });
  };

  const toggleTracking = (id) => {
    const updated = tasks.map(task => {
      if (task.id === id) {
        if (task.isTracking) {
          const now = Date.now();
          const elapsed = Math.floor((now - task.trackingStart) / 1000); // seconds
          return {
            ...task,
            isTracking: false,
            timeSpent: task.timeSpent + elapsed,
            trackingStart: null,
          };
        } else {
          return {
            ...task,
            isTracking: true,
            trackingStart: Date.now(),
          };
        }
      }
      return task;
    });
    setTasks(updated);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'priority') {
      const priorities = { low: 1, medium: 2, high: 3 };
      return priorities[b.priority] - priorities[a.priority];
    } else if (sort === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const chartData = Object.entries(
    tasks.reduce((acc, task) => {
      const date = task.createdAt || 'Unknown';
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, count }));

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      <form onSubmit={handleAddTask} className="mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full mb-2"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="open">Open</option>
          <option value="pending_approval">Mark as Closed (Pending Approval)</option>
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Assignee"
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full mb-2"
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Add Task
        </button>
      </form>

      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="border p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tasks Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className="border p-3 mb-2 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">
                  Priority: {task.priority} | Assignee: {task.assignee} | Due: {task.dueDate}
                </p>
                <p className="text-sm">Time Spent: {formatTime(task.timeSpent)}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <select
                  className="border p-1"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="pending_approval">Mark as Closed</option>
                </select>
                <button
                  className={`px-2 py-1 text-white rounded ${task.isTracking ? 'bg-red-500' : 'bg-green-500'}`}
                  onClick={() => toggleTracking(task.id)}
                >
                  {task.isTracking ? 'Stop' : 'Start'} Timer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperHome;