# Expense Tracker

A full-stack expense tracking application designed to help users record, organize, and understand their day-to-day financial activity in one place. The app allows a user to create an account, log in, add income and expense entries, edit or delete transactions, and review their financial history through both tabular views and summary analytics.

The goal of the project is to provide a simple personal finance dashboard with a clean interface and a practical full-stack architecture. On the frontend, users interact with a responsive React interface built with Ant Design components. On the backend, an Express server handles API requests, processes user and transaction data, and stores everything in MongoDB through Mongoose models.

From a workflow point of view, the application follows a straightforward path:
- users register and log in through the frontend
- the frontend sends requests to backend API routes using Axios
- the backend validates and processes those requests
- MongoDB stores the user and transaction data
- the frontend receives the response and updates the dashboard

The project is useful as both a working expense management app and a learning project for understanding how a React frontend connects to an Express and MongoDB backend in a real application structure.

The project is organized into two main apps:
- `client/` for the React frontend
- `backend/` for the Express and MongoDB backend

## Features

- User registration and login
- Add, edit, delete, and view transactions
- Filter transactions by type and date range
- Analytics dashboard for income and expense summaries
- Responsive UI for desktop and mobile screens

## Tech Stack

### Frontend
- React
- React Router
- Ant Design
- Axios
- Moment.js

### Backend
- Node.js
- Express
- MongoDB Atlas / MongoDB
- Mongoose
- bcrypt
- dotenv

## Project Structure

```text
expensetracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── .env
├── package.json
└── package-lock.json
```

## Getting Started

### 1. Clone the project

```bash
git clone <your-repository-url>
cd expensetracker
```

### 2. Install dependencies

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
cd ..
```

If you want to work inside `backend/` independently, you can also install there:

```bash
cd backend
npm install
cd ..
```

### 3. Configure environment variables

Create or update the root `.env` file:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/expensetracker?retryWrites=true&w=majority&appName=Cluster0
```

Notes:
- Keep the `.env` file in the project root
- Do not add spaces around `=`
- Make sure your MongoDB Atlas IP access and database user are configured correctly

## Running the Project

### Run frontend and backend together

From the project root:

```bash
npm run dev
```

### Run backend only

From the project root:

```bash
npm run server
```

Or from the `backend/` folder:

```bash
npm run server
```

### Run frontend only

From the project root:

```bash
npm run client
```

Or from the `client/` folder:

```bash
npm start
```

## Application URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## API Base Routes

- Users: `/api/v1/users`
- Transactions: `/api/v1/transactions`

Example endpoints:
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/transactions/add-transaction`
- `POST /api/v1/transactions/get-transaction`
- `POST /api/v1/transactions/edit-transaction`
- `POST /api/v1/transactions/delete-transaction`

## Build Frontend for Production

From the `client/` folder:

```bash
npm run build
```

## Common Issues

### PowerShell blocks `npm`

If PowerShell shows a script execution error, use:

```powershell
npm.cmd install
npm.cmd start
```

### MongoDB connection fails

Check:
- your `MONGODB_URI`
- Atlas cluster status
- database username and password
- Atlas Network Access IP whitelist

### Frontend loads but API requests fail

Make sure:
- backend is running on port `8080`
- frontend is running on port `3000`
- the proxy in `client/package.json` is intact

## Available Scripts

### Root scripts

- `npm run dev` starts frontend and backend together
- `npm run server` starts the backend from the root
- `npm run client` starts the frontend from the root

### Backend scripts

- `npm run start` runs the backend with Node
- `npm run server` runs the backend with Nodemon

### Frontend scripts

- `npm start` starts the React development server
- `npm run build` creates a production build
- `npm test` runs frontend tests

## Notes

- The frontend uses the proxy defined in `client/package.json` to reach the backend
- The backend reads environment variables from the root `.env`
- MongoDB Atlas is recommended for the database connection

## Author

Chandrashekar
