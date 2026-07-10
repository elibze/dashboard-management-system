# Dashboard Management System (React + GraphQL)

## Project Overview

This project is a dashboard management system built with React and GraphQL. It simulates a real-world admin dashboard with authentication, dashboard statistics, user management, profile editing, protected routes, and GraphQL API integration.
The application demonstrates frontend practices, including reusable components, state management, responsive design, loading states, error handling, accessibility, and performance optimizations.

---

## Features

### Authentication
- Login page
- Registration page
- Form validation
- Mock authentication
- Protected routes
- Logout functionality
- User session stored in localStorage

**Mock credentials**
Email:
```
admin@test.com
```
Password:
```
admin123
```
---

### Dashboard
Displays live statistics fetched from GraphQL:
- Total Users
- Total Posts
- Total Comments
- Total Albums
Includes:
- Loading skeleton
- Error handling
- Responsive cards

---

### User Management

Features:
- Search users by name
- Search users by email
- Sort by name
- Sort by username
- Pagination (10 users per page)
- User details page
- GraphQL integration

---

### Profile

Displays:
- User name
- Email
- Role

Allows:
- Editing profile
- Saving profile to localStorage

---

### UI Features

- Responsive dashboard
- Sidebar navigation
- Header with:
  - Current user
  - Current date
  - Mock notification icon
- Bootstrap 5 styling
- React Icons

---

### Loading & Error Handling
Implemented throughout the application.
Loading:
- Spinner
- Card Skeleton
- Table Skeleton
Errors:
- API errors
- Network errors
- Empty state handling

---

### Performance
Implemented using:
- useMemo
- useCallback
- React.memo

---
### Accessibility
Implemented:
- Semantic HTML
- Labels for form fields
- Keyboard-accessible buttons
- aria-label attributes
- Mostly responsive layout

---
## Technologies Used
- React
- React Router DOM
- GraphQL
- GraphQL Zero API
- Bootstrap 5
- React Icons
- CSS
- JavaScript (ES6)
---
## Installation
Clone the repository
```bash
git clone https://github.com/elibze/dashboard-management-system.git
```
Go into the project
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
---

## Screenshots

### Login
<img width="706" height="604" alt="image" src="https://github.com/user-attachments/assets/c51bc3a6-66f5-4a79-96cc-25bd137cfaab" />

### Dashboard
<img width="1898" height="874" alt="image" src="https://github.com/user-attachments/assets/79069f73-f8b9-4f92-a32a-eb1d2d4b4f7f" />

### Users
<img width="1902" height="892" alt="image" src="https://github.com/user-attachments/assets/740808bc-170f-4e1d-89f0-70d21b402ca5" />

### User Details
<img width="1875" height="872" alt="image" src="https://github.com/user-attachments/assets/8196f323-e3e0-4fc3-b98c-973281448ca4" />

### Profile
<img width="1898" height="856" alt="image" src="https://github.com/user-attachments/assets/bab41474-d1bd-44cc-8c8f-88130957c9b1" />

This project was developed for educational purposes.
