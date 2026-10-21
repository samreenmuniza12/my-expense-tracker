# Expense Tracker (MERN Stack)

A fully responsive Expense Tracker web app built with the **MERN stack** (MongoDB, Express, React, Node.js). It includes secure user authentication (email/password and Google login), income and expense management, interactive charts, and Excel export.

## Features

1. **User Authentication**: Secure sign-up and login using JWT.
2. **Google Login**: Quick sign-in with the "Continue with Google" button.
3. **Dashboard Overview**: Summary cards showing Total Balance, Total Income and Total Expenses.
4. **Income Management**: Add, view, delete and export income sources.
5. **Expense Management**: Add, view, delete and export expenses with category-based tracking.
6. **Interactive Charts**: Bar, Pie and Line charts to visualize income and expenses.
7. **Recent Transactions**: Quick view of the latest income and expense records.
8. **Excel Reports**: Download all income and expense data as Excel files.
9. **Mobile Responsive UI**: Works smoothly on desktops, tablets and phones.
10. **Easy Navigation**: Sidebar menu with Dashboard, Income, Expenses and Logout.
11. **Delete Functionality**: Hover over an income or expense card to reveal the delete button.

## Tech Stack

**Frontend:** React, React Router, Axios, Recharts (charts), Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Authentication:** JSON Web Tokens (JWT), Google OAuth 2.0
**Other:** xlsx (Excel export)

> Note: If your project uses different libraries, update this list.

## Project Structure

```
ExpenseTracker/
├── backend/     # Express server, routes, controllers, models
└── frontend/    # React application
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)
- A Google Cloud project with OAuth credentials (for Google login)

### 1. Clone the repository

```bash
git clone https://github.com/samreenmuniza12/my-expense-tracker.git
cd my-expense-tracker
```

### 2. Setup Google login

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and open **APIs & Services > Credentials**.
3. Click **Create Credentials > OAuth client ID** and choose **Web application**.
4. Add your frontend URL (for example `http://localhost:5173`) under **Authorized JavaScript origins**.
5. If your app uses a redirect flow, also add the callback URL under **Authorized redirect URIs**.
6. Copy the **Client ID** (and **Client Secret** if needed) for the `.env` files below.

### 3. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the server:

```bash
npm run dev
```

### 4. Setup the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the app:

```bash
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`).

## How to Use

1. Sign up with email and password, or click **Continue with Google**.
2. Add your income and expenses from the Income and Expense pages.
3. Check the Dashboard for your balance, charts and recent transactions.
4. Click **Download** to export your data as an Excel file.
5. Hover over any card and click the delete icon to remove a record.

## Security Note

Never upload your `.env` files to GitHub. They contain private keys and passwords. Make sure `.env` is listed in your `.gitignore` file.

## Author

**Samreen Muniza**
GitHub: [@samreenmuniza12](https://github.com/samreenmuniza12)

## License

This project is open source and free to use for learning purposes.
