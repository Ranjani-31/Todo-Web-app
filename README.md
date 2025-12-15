# Todo Web App

## Overview
The Todo Web Application enables users to manage their daily tasks and long-term goals efficiently. Users can create, update, and delete todos while tracking due dates. The system enforces time-based constraints to improve accountability and task discipline.

If a task is not completed within the specified due time, it is automatically marked as incomplete. Users are allowed to edit todos only before the due time expires.

## Key Features
- User authentication using JWT

- Secure password storage with bcrypt hashing

- Create, update, and delete todos

- Due-date–based task tracking

- Automatic status update for overdue tasks

- Time-restricted editing of todos

- Goal tracking support

## Security Implementation

- JWT Authentication for secure session management

- Password Hashing using bcrypt to protect user credentials

- Protected routes with authentication middleware

## Technology Stack
  ### Frontend
  
   - React
  
  ### Backend
  
   - Node.js
  
   - Express.js
  
  ### Database
  
   - MongoDB


### Application Rules & Logic

1. A todo must have a due date.

2. Users can edit a todo only before the due time.

3. Todos that exceed the due time without completion are marked as incomplete.

4. All todo operations are restricted to authenticated users.

## Environment Setup

Before running the application, configure the required environment variables.

### Backend Environment Variables (.env)
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
## Installation and Running the Application
### Step 1: Clone the Repository
    git clone <repository-url>
    cd todo-web-app

### Step 2: Start the Backend Server
    cd server
    npm install
    npm start


The backend server will start on the configured port.

### Step 3: Start the Frontend Application
    cd client
    npm install
    npm run dev


The frontend application will run in the browser.

## Project Structure (High-Level)
    todo-web-app/
    │
    ├── server/        # Backend (Node.js + Express)
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    │
    ├── client/        # Frontend (React)
    │   ├── components/
    │   ├── pages/
    │   └── services/

## Future Enhancements

- Email reminders for upcoming deadlines

- Task priority levels

- Analytics dashboard for productivity tracking

- Role-based access control

## Conclusion

This Todo Web Application demonstrates a secure, scalable, and rule-driven task management system built using the MERN stack. It follows industry best practices in authentication, data validation, and time-based business logic.
