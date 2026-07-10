# Dashboard Management System (React + GraphQL)

## Project Overview

This project is a dashboard management system built with **React and GraphQL**. 
The application simulates a real-world company dashboard with authentication, user management, dashboard statistics, profile management, responsive design, and API integrations.

The project demonstrates:
- Authentication and authorization
- Protected routes
- GraphQL API integration
- Data tables with search, sorting, and pagination
- LocalStorage-based user management
- Responsive UI design
- Loading states and error handling
- Reusable React components
- Weather API integration

---

## Features

### Authentication
Implemented authentication system with localStorage.

- Login page
- Registration page
- User account creation
- User login/logout
- Protected routes
- Sessions persistence after refresh
- Form validation
- Different user roles

### Admin account
Default administrator account:
Email:
```
admin@test.com
```
Password:
```
admin123
```

### User accounts
Users can:
- Create a new account
- Login using their credentials
- Edit their profile information
- Change their password
- View their personal dashboard information
User data is stored locally using localStorage.

# Dashboard
The dashboard displays live information fetched from GraphQL:
- Total Users
- Total Posts
- Total Comments
- Total Albums
Includes:
- Responsive statistic cards
- Loading skeletons
- API error handling
- Personalized welcome message
- Weather widget

---

# Weather Integration
The dashboard includes a weather card using a free weather API.
Features:
- Current temperature
- Weather condition
- Weather icons
- Wind speed
- Loading state
- Error handling
Weather is display using **Open-Meteo API**. No API key is required.

---

# User Management
The users module provides a complete management table.
Features:
- Fetch users from GraphQL API
- Search users by name or email
- Sort by name or username
- Pagination (10 users per page)
- Responsive table design
- User details page
Each user row can be selected to view additional information.

---

### Profile Management

Displays:
- User ID
- Name
- Email
- Company
- Role

Users can:
- Edit profile information
- Save changes to localStorage
- Change password

Security features:
- Role cannot be modified
- Password validation
- Current password verification
- Password confirmation check

---

### Dashboard Layout
The application uses a responsive dashboard layout.
Includes:
## Sidebar
Navigation:
- Dashboard
- Users
- Profile
- Logout
## Header
Displays:
- Current user
- Current date
- Mock notification icon
- Responsive mobile menu

The layout adapts for:
- Desktop
- Tablet
- Mobile devices
  
---

### Loading & Error Handling
Implemented throughout the application.

Loading states:
- Spinner loader
- Card skeleton loader
- Table skeleton loader
  
Handled errors:
- GraphQL errors
- Network errors
- Empty data states
- Invalid login attempts
- Invalid registration attempts
- Password validation errors
- Weather API errors

---

### Performance
Implemented using:
- useMemo
- useCallback
- React.memo
Used to reduce unnecessary renders and optimize table performance.

---
### Accessibility

Implemented:
- Semantic HTML
- Labels for form fields
- Keyboard-accessible buttons
- aria-label attributes
- Accessible buttons
- Responsive layout

---

## Technologies Used
Frontend:
- React
- JavaScript ES6+
- React Router DOM
- Bootstrap 5
- CSS

API:
- GraphQL
- GraphQL Zero API
- Open-Meteo Weather API

Libraries:
- React Icons

---

# Installation
Clone the repository
```bash
git clone https://github.com/elibze/dashboard-management-system.git
```
Navigate into the project
```bash
cd dashboard-management-system
```
Install dependencies
```bash
npm install
```
Start the development server
```bash
npm run dev
```
---

## GraphQL API
This project uses:
GraphQL Zero
https://graphqlzero.almansi.me/

Example query:
```graphql
query GetUsers {
  users {
    data {
      id
      name
      username
      email
    }
  }
}
```
GraphQL is used for:
- Dashboard statistics
- User list data
- User details

---

# Deployment 
The application is deployed using Vercel.

Live demo:
https://dashboard-management-system-two.vercel.app/

The project can be run locally using the installation steps above, or accessed directly through the deployed Vercel application.

## Screenshots

### Login
<img width="706" height="604" alt="image" src="https://github.com/user-attachments/assets/c51bc3a6-66f5-4a79-96cc-25bd137cfaab" />

### Dashboard
<img width="1908" height="880" alt="image" src="https://github.com/user-attachments/assets/5d071214-a144-45d3-bc58-aaf679afd097" />

### Users
<img width="1900" height="875" alt="image" src="https://github.com/user-attachments/assets/091d32b2-e76a-4ea7-ab79-9b37568e7a5c" />

### User Details
<img width="1910" height="881" alt="image" src="https://github.com/user-attachments/assets/9a1659b5-e044-438f-b233-4f6e4ce5548f" />

### Profile
<img width="1902" height="889" alt="image" src="https://github.com/user-attachments/assets/5e90a0d7-74c1-475e-8bf1-d329288b9b5f" />

This project was developed for educational purposes.
