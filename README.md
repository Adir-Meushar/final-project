# Final-Project

## Overview
This is a full-stack e-commerce project aimed at providing users with a seamless shopping experience for groceries. 
The project includes both frontend and backend components, facilitating features such as shopping,
adding items to the cart, processing payments, user account management, and an admin dashboard for managing products.

## Api Documentaion
For detailed information on the API endpoints and usage, refer to this link:https://documenter.getpostman.com/view/28292567/2s9Yyqj2pR

## Features
#### User Management:
- **Registration & Authentication:**
Users can register for an account securely using their email and password. Authentication is handled through JSON Web Tokens (JWT), ensuring secure access to user-specific features.

- **Profile Editing :**
 Registered users have the ability to edit their profile details and delete their account if needed.

- **Role-Based Access Control (RBAC) :**
  Admin privileges enable additional functionalities such as managing products and viewing user data and delete.
  
#### Product Management:
As an admin, you can log in to the admin dashboard to perform CRUD operations on products.

#### Error Handling:
Custom 404 error page for a user-friendly experience on undefined routes.
Meaningful error messages for various scenarios.

#### Security Measures:
Passwords are securely hashed using bcrypt.
JSON Web Tokens (JWT) for secure user authentication.
Middleware ensures proper access controls and permissions.

## Overall Architecture
The project follows a modular structure, with organized routes, middleware, models, and validation using Joi.
MongoDB serves as the data store, ensuring efficient and scalable data management. 
JSON Web Tokens (JWT) provide a secure authentication mechanism.

### Technologies Used
- **Node.js:**
  - JavaScript runtime environment for server-side development.

- **bcrypt:**
  - Password hashing for secure storage.

- **chalk:**
  - Terminal string styling for enhanced console output.

- **cors:**
  - Middleware for Cross-Origin Resource Sharing in Express.js.

- **dotenv:**
  - Environment variable management for configuration.

- **express:**
  - Web application framework for building server-side logic.

- **fs:**
  - Node.js file system module for file interactions.

- **joi:**
  - Object schema validation for data sanitization.

- **jsonwebtoken:**
  - Creation and verification of JSON Web Tokens for secure authentication.

- **moment:**
  - Date and time manipulation library for JavaScript.

- **mongoose:**
  - MongoDB object modeling for schema-based database interaction.

These technologies collectively power the Node.js backend, ensuring security, functionality, and efficient data management in the web application.

