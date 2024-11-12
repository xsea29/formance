# formance (User Management Application)

This is a full-stack like user management application that lets users view, add, edit, and delete user information. The project includes both a backend (using JSON server for data storage) and a frontend built with React.

### Features

- View all users with details like name, email, and date of birth.
- Add new users with a form.
- Edit existing user information.
- Delete users from the list.
- Search users by name.

### Project Structure

The project is divided into two main parts:

- Backend: Uses JSON Server to serve as a mock database.
- Frontend: Built with React and communicates with the backend to display and manage users.

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Backend Setup

- Clone this repository: git clone formance
- Install JSON Server: If JSON Server is not installed globally, install it by running: npm install -g json-server
- Create the JSON database: Inside the project directory, create a file named db.json with initial user data:
- Start the backend server: json-server --watch database.json --port 5000
- This will start JSON Server on http://localhost:5000.

### Frontend Setup

- Navigate to the frontend folder (inside the main project directory): cd formance.
- Install dependencies:npm install
- Run the frontend application: npm start
- This will start the frontend on http://localhost:3000.

  ## Thankyou!
