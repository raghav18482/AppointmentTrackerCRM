# Crowd Manager - Frontend

This is the frontend application for the **Crowd Manager** Smart Queue CRM. It is built using [Vite](https://vitejs.dev/) + [React](https://reactjs.org/).

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

## Getting Started

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install React, React Router, Axios, Lucide Icons, and other necessary packages.

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:5173`.

## Project Structure

- `src/components`: Reusable UI components (Navbar, Hero, Features, etc.)
- `src/pages`: Main page views (LandingPage, LoginPage, RegisterPage)
- `src/index.css`: Global styles and strict variable definitions for the premium theme.

## Backend Integration

The frontend is configured to communicate with the backend API at `http://localhost:8000/api/v1`.
Ensure the FastAPI backend is running for Login and Registration features to work.

## Build for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder.
