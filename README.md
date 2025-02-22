## [Frontend Live Link](https://todos56.netlify.app/)

## Overview
This is the frontend for the Task Management Application, built using Vite.js and React. It provides an interactive drag-and-drop interface for managing tasks categorized as "To-Do," "In Progress," and "Done." The application features Firebase Authentication and real-time synchronization with the backend.

## Features
- User authentication using Firebase (Google Sign-In)
- Add, edit, delete, and reorder tasks
- Drag-and-drop functionality to move and reorder tasks
- Persistent data storage using MongoDB via an Express.js backend
- Responsive design for desktop and mobile

## Tech Stack
- **Framework:** React (with Vite.js)
- **State Management:** React Hooks
- **Drag-and-Drop:** @hello-pangea/dnd
- **UI Styling:** Tailwind CSS
- **Authentication:** Firebase Authentication
- **Backend Communication:** Axios

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager-frontend.git
   cd task-manager-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Usage
- Sign in with Google to access the app.
- Create tasks by entering a title and optional description.
- Drag and drop tasks between categories.
- Edit or delete tasks as needed.

## Build for Production
To create a production build, run:
```sh
npm run build
# or
yarn build
```

## Deployment
Deploy the frontend using services like Vercel, Netlify, or Firebase Hosting.

---