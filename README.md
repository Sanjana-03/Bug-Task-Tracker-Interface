# Bug Task Tracker

A simple bug and task tracking interface built with React, Vite, and Tailwind CSS.

## Features

- **User Login:** Login as Developer or Manager using predefined credentials.
- **Developer Dashboard:**
  - View, add, and filter tasks.
  - Track time spent on tasks with a timer.
  - Mark tasks as closed (pending manager approval).
  - Visualize task trends with a chart.
- **Manager Dashboard:**
  - View all tasks.
  - Approve or reopen tasks marked as closed by developers.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

```sh
cd bug-task-tracker
npm install
```

### Running the App

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

## Default Users

| Role      | Email           | Password |
|-----------|-----------------|----------|
| Developer | dev@gmail.com   | dev123   |
| Manager   | man@gmail.com   | man123   |

## Project Structure

- `src/pages/UserLogin.jsx` – Login page for users.
- `src/pages/DeveloperHome.jsx` – Developer dashboard for managing and tracking tasks.
- `src/pages/ManagerHome.jsx` – Manager dashboard for approving/reopening tasks.
- `src/store/users.jsx` – Hardcoded user credentials.
- `src/store/tasks.jsx` – Initial tasks data.
- `src/App.jsx` – Main app with routing.
- `src/main.jsx` – App entry point.
- `vite.config.js` – Vite configuration.
- `tailwindcss` – Used for styling.

## Notes

- Tasks are stored in `localStorage` for persistence between reloads.

---