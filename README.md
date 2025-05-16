# Learning Resource Management Platform

A modern web application built with React, TypeScript, and Firebase that provides secure authentication and user management.

## Features

### Authentication & User Management
- Secure user registration and login
- Email/password authentication
- Password reset functionality
- Protected routes for authenticated users
- User profile management
- Session persistence
- Profile photo upload and management

### User Experience
- Modern, responsive design with Tailwind CSS
- Intuitive navigation and user interface
- Real-time authentication state management
- Secure authentication system
- Protected routes for authenticated users

### Dashboard
- User profile overview
- Protected user dashboard
- Profile update capabilities

### Resource Management
- Add, edit, and delete learning resources
- Categorize resources for better organization
- Track resource status (Not Started, In Progress, Completed)
- Rate resources and add personal notes
- View resource statistics and progress

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **State Management**: React Context API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and enable Authentication

4. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm run dev
```

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
