# Final-Project

## Overview
This is a full-stack e-commerce project aimed at providing users with a seamless shopping experience for groceries. 
The project includes both frontend and backend components, facilitating features such as shopping,
adding items to the cart, processing payments, user account management, and an admin dashboard for managing products.

## Api Documentaion
For detailed information on the API endpoints and usage, refer to this link:https://documenter.getpostman.com/view/28292567/2s9Yyqj2pR

## Features
### User Management:
- **Registration & Authentication:**
Users can register for an account securely using their email and password. Authentication is handled through JSON Web Tokens (JWT), ensuring secure access to user-specific features.

- **Profile Editing :**
 Registered users have the ability to edit their profile details and delete their account if needed.

- **Role-Based Access Control (RBAC) :**
  Admin privileges enable additional functionalities such as updating user type,viewing user data and delete.
  
### Product Management:
- **Admin Dashboard:**
 Administrators have access to a dedicated dashboard where they can perform CRUD operations on products.
 This includes adding new products, updating existing ones, deleting items, and viewing the product catalog.

### Error Handling:
- **Custom 404 Error Page :**
 A custom 404 error page is implemented to enhance user experience when accessing undefined routes.

- **Meaningful Error Messages:**
 Detailed error messages are provided to users, guiding them through potential issues and resolutions.
  
### Security Measures:
- **Password Hashing:**
 User passwords are securely hashed using bcrypt before being stored in the database, ensuring protection against unauthorized access.

- **JWT Authentication:**
 JSON Web Tokens are used for user authentication, providing a secure and stateless authentication mechanism.
  
- **Access Controls & Permissions:**
 Middleware is implemented to enforce proper access controls and permissions, ensuring that users can only access functionalities they are authorized to use.

## Overall Architecture
The project follows a modular and scalable architecture, incorporating both frontend and backend components to deliver a comprehensive e-commerce solution.

### Frontend
- **React.js:**
  The frontend is built using React.js, a popular JavaScript library for building user interfaces.
  React.js offers component-based architecture, enabling efficient development and maintenance of complex UIs.
  
- **React Router:**
   React Router is utilized for client-side routing, enabling navigation between different views and ensuring a smooth browsing experience for users.

- **React Icons:**
   React Icons provides a collection of customizable icons for use in the frontend UI, enhancing visual appeal and usability.

- **Moment.js:**
  Moment is a Date and time manipulation library for JavaScript.
   
### Backend
- **Node.js:**
   The project utilizes the Node.js runtime environment for server-side development, offering scalability and performance.

- **Express.js:**
   Express.js is used as the web application framework, providing robust features for building server-side logic and handling HTTP requests.
  
  **Cors:**
   Cors middleware is integrated to handle Cross-Origin Resource Sharing in Express.js applications.
   
- **Dotenv:**
   Dotenv is used for environment variable management, facilitating configuration across different environments.
  
- **MongoDB:**
   MongoDB serves as the database management system, offering flexibility and scalability for storing product data, user information, and session details.
   
- **mongoose:**
   Mongoose is used as an Object Data Modeling (ODM) library for MongoDB, simplifying interactions with the database through schema-based modeling.
  
### Additional Technologies Used
- **jsonwebtoken:**
  Jsonwebtoken is employed for the creation and verification of JSON Web Tokens, enabling secure user authentication.

- **Chalk:**
  Chalk is utilized for terminal string styling, enhancing console output readability.
  
 - **joi:**
   Joi provides robust schema validation for ensuring data integrity.
   
- **bcrypt:**
  bcrypt offers secure password hashing for user authentication.
  
- **fs:**
  fs enables file system interactions for managing files and directories.
  
## Additional Technologies Used
The Final-Project is a full-stack e-commerce platform tailored for groceries shopping. It offers robust features such as user registration, authentication, profile editing, and role-based access control. Administrators have access to an admin dashboard for managing products. Error handling mechanisms ensure a smooth user experience, while security measures include password hashing, JWT authentication, and access controls. The architecture employs React.js for the frontend, Express.js for the backend, MongoDB for data storage, and integrates additional technologies like Joi for validation, bcrypt for password hashing, and fs for file system interactions.


