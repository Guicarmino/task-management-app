# Cloud-Based Task Management Application

## Project Overview

This project is a cloud-based task management application developed as part of CST8922 Applied Projects.

The application allows users to register, log in, and manage their own personal tasks using a React frontend and Firebase backend services.

This final version includes full task management functionality such as creating, viewing, editing, deleting, and updating task completion status.

## Technologies Used

- React
- Vite
- Firebase Authentication
- Firebase Firestore
- JavaScript
- CSS

## Features Implemented

### Authentication
- User registration with email and password
- User login with email and password
- Session management using Firebase Authentication
- Logout functionality

### Task Management
- Add new task
- View tasks for logged-in user only
- Edit existing task
- Delete task
- Mark task as completed
- Mark task back to pending
- Tasks displayed in descending order by creation date

### Validation and UI Improvements
- Prevent empty task titles
- Minimum title length validation
- Validation for edit mode
- Success and error messages
- Improved layout and cleaner styling

## Project Structure

task-management-app/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AuthForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskItem.jsx
│   ├── services/
│   │   └── firebase.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js