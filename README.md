# Student Information System

A full-stack CRUD web application built with React JS, PHP (Object-Oriented Programming), and MySQL. This system allows users to manage student records with Create, Read, Update, and Delete operations.

## Technology Stack

- **Frontend:** React JS with Vite
- **Backend:** PHP (Object-Oriented Programming)
- **Database:** MySQL
- **Database Connection:** PDO (PHP Data Objects)
- **Local Server:** XAMPP
- **Styling:** Bootstrap 5

## Project Structure

```
StudentInformationSystem/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React Components
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── services/       # API Service Layer
│   │   │   └── studentService.js
│   │   ├── App.jsx         # Main Application Component
│   │   ├── main.jsx        # Entry Point
│   │   ├── index.css       # Global Styles
│   │   └── App.css         # Component Styles
│   ├── public/             # Static Assets
│   ├── package.json        # Dependencies
│   └── vite.config.js      # Vite Configuration
│
├── server/                 # PHP Backend
│   ├── api/
│   │   └── student.php     # Student API Endpoints
│   ├── config/
│   │   └── database.php    # Database Configuration
│   ├── controllers/
│   │   └── StudentController.php
│   ├── models/
│   │   └── Student.php     # Student Model
│   └── index.php           # Backend Entry Point
│
└── database/
    └── student_system.sql  # Database Schema
```

## Features

- ✅ **Create** - Add new student records
- ✅ **Read** - View all students in a clean, organized table
- ✅ **Update** - Edit existing student information
- ✅ **Delete** - Remove student records with confirmation prompt
- ✅ **Search** - Search students by name, course, email, or year level
- ✅ **Form Validation** - Client-side validation for empty fields and email format
- ✅ **Responsive Design** - Mobile-friendly layout using Bootstrap 5
- ✅ **Error Handling** - User-friendly error messages for failed operations

## Prerequisites

- XAMPP (or any PHP/MySQL local server)
- Node.js and npm (for React development)
- Modern web browser

## Installation Instructions

### 1. Setup XAMPP

1. Download and install XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Start Apache and MySQL services from XAMPP Control Panel

### 2. Setup Database

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Import the database schema:
   - Navigate to the `database` folder
   - Open `student_system.sql` in a text editor
   - Copy the SQL commands
   - In phpMyAdmin, go to the SQL tab
   - Paste and execute the SQL commands

   Or import the file directly:
   - In phpMyAdmin, click "Import"
   - Choose the `student_system.sql` file
   - Click "Go"

### 3. Setup Backend

1. Copy the `StudentInformationSystem` folder to:
   ```
   C:\xampp\htdocs\
   ```

2. Verify the backend is accessible:
   ```
   http://localhost/StudentInformationSystem/server/
   ```

### 4. Setup Frontend

1. Open a terminal/command prompt
2. Navigate to the client folder:
   ```bash
   cd C:\xampp\htdocs\StudentInformationSystem\client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser (usually `http://localhost:5173`)

## Usage

### Adding a Student

1. Fill in the form fields (Firstname, Lastname, Course, Year Level, Email)
2. Click "Save Student"
3. The student will be added to the database and displayed in the list

### Editing a Student

1. Click the "Edit" button next to a student in the list
2. The form will populate with the student's information
3. Modify the desired fields
4. Click "Update Student" to save changes
5. Click "Cancel" to exit edit mode without saving

### Deleting a Student

1. Click the "Delete" button next to a student in the list
2. Confirm the deletion in the prompt
3. The student will be removed from the database

### Searching Students

1. Type in the search box to filter students
2. The list will automatically update to show matching results
3. Search works across all fields (name, course, email, year level)

## Database Schema

### Table: students

| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(20) (PRIMARY KEY) | Custom student ID format (e.g., 2026-0001) |
| firstname | VARCHAR(100) | Student's first name |
| middlename | VARCHAR(100) | Student's middle name (optional) |
| lastname | VARCHAR(100) | Student's last name |
| course | VARCHAR(100) | Student's course/program |
| year_level | INT | Student's year level (1-5) |
| phone_number | VARCHAR(20) | Student's phone number |
| email | VARCHAR(150) | Student's email address |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## API Endpoints

### Base URL
```
http://localhost/StudentInformationSystem/server/api/student.php
```

### Methods

- **GET** - Retrieve all students or a single student by ID
- **POST** - Create a new student
- **PUT** - Update an existing student
- **DELETE** - Delete a student

## Development

### Building for Production

```bash
cd client
npm run build
```

The built files will be in the `client/dist` folder.

### Linting

```bash
cd client
npm run lint
```

## Troubleshooting

### Database Connection Error

- Ensure MySQL is running in XAMPP
- Verify database credentials in `server/config/database.php`
- Check that the database `student_system` exists

### CORS Errors

- The API already includes CORS headers for `http://localhost:5173`
- If using a different port, update the CORS header in `server/api/student.php`

### Frontend Not Loading

- Ensure the React dev server is running (`npm run dev`)
- Check the browser console for errors
- Verify all dependencies are installed (`npm install`)

## Academic Integrity

This project was developed as part of the Preliminary Examination for:
- Advanced Database Systems
- Web Systems and Technologies
- Integrative Programming and Technologies

All code is original and developed by the student. This project demonstrates:
- Frontend development with React JS
- Backend programming with PHP OOP
- Database management with MySQL
- Integration of full-stack technologies

## License

This project is for educational purposes only.

## Author

[Your Name]
Student Information System
Preliminary Examination - [Current Date]
