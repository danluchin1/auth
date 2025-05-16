# Learning Resource Management Platform

A modern web application built with React, TypeScript, and Firebase that helps users organize and track their learning resources effectively.

## Features

### Resource Management
- Add, edit, and delete learning resources
- Categorize resources for better organization
- Track resource status (Not Started, In Progress, Completed)
- Rate resources and add personal notes
- View resource statistics and progress

### User Experience
- Modern, responsive design with Tailwind CSS
- Intuitive navigation and user interface
- Real-time updates with Firebase
- Secure authentication system
- Protected routes for authenticated users

### Dashboard
- Overview of learning progress
- Statistics and metrics
- Recent activity tracking
- Quick access to resources
- Category management

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
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

3. Create a Firebase project and enable Authentication and Firestore

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

## Usage

### Authentication
1. Visit the landing page
2. Click "Get Started" to create an account or "Log in" to sign in
3. Complete the authentication process

### Managing Resources
1. Navigate to the Resources page from the dashboard
2. Use the "Add Resource" button to create new resources
3. Fill in the resource details:
   - Title
   - URL
   - Category
   - Rating
   - Notes
   - Status
4. Use the category manager to organize resources

### Dashboard
- View your learning statistics
- Track progress across different categories
- Monitor recent activity
- Quick access to resources

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
