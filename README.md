# Task Management System

A simple full-stack Task Management application built using **Next.js (frontend)** and **JSON Server (backend API)**. It includes user authentication, task CRUD functionality, and a responsive sidebar layout.


### Frontend (Next.js)
- **Technologies:** React, Next.js, Tailwind CSS, Axios, Toastify
- **Features:**
  - User Login & Signup (LocalStorage-based auth)
  - Task CRUD (Create, Read, Update, Delete)
  - Responsive UI with TailwindCSS
  - Toast messages for feedback & Custom Error handle
  - Protected Routes using AuthContext

### Backend (JSON Server on Render)
- Simulates a RESTful API
- Hosted on: [https://backend-api-task-hk.onrender.com](https://backend-api-task-hk.onrender.com)
- Data model: `users`, `tasks`


### Clone the repository
git clone https://github.com/hardik-rl/Task-Management-System


### Start the project
npm i
npm run dev


### Backend (JSON Server)

The backend is powered by **JSON Server**, hosted on [Render](https://render.com), which provides a free REST API for mock data.

These two API endpoints are used for the Task Management application:

- 👤 **Users API:**  
  [https://backend-api-task-hk.onrender.com/users](https://backend-api-task-hk.onrender.com/users)  
  Used for login, signup, and user validation.

- ✅ **Tasks API:**  
  [https://backend-api-task-hk.onrender.com/tasks](https://backend-api-task-hk.onrender.com/tasks)  
  Used to perform CRUD operations on tasks (create, read, update, delete).


### Set Up Environment Variables
create .env file root path and  add below line

NEXT_PUBLIC_API_URL=https://backend-api-task-hk.onrender.com


### Deployment

🚀 Live App: https://task-management-system-sandy-mu.vercel.app