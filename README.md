# Employee Management System

A robust Employee Management System built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This application provides APIs for managing employee data, including creating, updating, deleting, and searching employees. It also includes authentication and role-based access control.

---

## Features
- **Employee Management**:
  - Create, update, delete, and retrieve employee details.
  - Search employees by name, department, or position.
  - Pagination support for listing employees.
- **Authentication**:
  - JWT-based authentication.
  - Role-based access control (admin and user roles).
- **Error Handling**:
  - Global exception handling with detailed error messages.
- **Logging**:
  - Winston-based logging with rotating log files.
- **Validation**:
  - Input validation using `express-validator`.
- **Security**:
  - Data sanitization against NoSQL injection.
  - Environment variables for sensitive data.

---

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - TypeScript
  - MongoDB (with Mongoose)
- **Authentication**:
  - JSON Web Tokens (JWT)
- **Logging**:
  - Winston
  - Winston Daily Rotate File
- **Validation**:
  - Express Validator
- **Environment Management**:
  - Dotenv

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or remotely)
- TypeScript (installed globally or as a dev dependency)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/employee-management.git
   cd employee-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=4000
     DB_STRING=mongodb://localhost:27017/employee-management
     JWT_SECRET=your-secret-key
     ```
4. Compile TypeScript:
   ```bash
   npm run build
   ```

### Running the Application
- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

---

## API Documentation

### Base URL
```
http://localhost:4000
```

### Endpoints
#### Authentication
- **Generate Token**: `GET /auth/generate-token/:role`

#### Employees
- **Create Employee**: `POST /employees`
- **Get All Employees**: `GET /employees`
- **Get Employee by ID**: `GET /employees/:id`
- **Update Employee**: `PUT /employees/:id`
- **Delete Employee**: `DELETE /employees/:id`
- **Search Employees**: `GET /employees/search`

#### Health Check
- **Server Health Check**: `GET /`

For detailed API documentation, refer to the [API Documentation](./API_DOCUMENTATION.md).

---

## Project Structure
```
employee-management/
├── dist/                  # Compiled JavaScript files
├── src/                   # Source files
│   ├── app.ts             # Main application entry point
│   ├── controllers/       # Controllers for handling requests
│   ├── exceptions/        # Exception handling and logging
│   ├── middleware/        # Custom middleware (e.g., JWT verification)
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── validators/       # Request validation schemas
├── lib/                   # Shared utilities and types
├── .env                  # Environment variables
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## Environment Variables
| Variable       | Description                          | Default Value                     |
|----------------|--------------------------------------|-----------------------------------|
| `PORT`         | Port on which the server runs        | `4000`                            |
| `DB_STRING`    | MongoDB connection string            | `mongodb://localhost:27017/employee-management` (local-db) |
| `JWT_SECRET`   | Secret key for JWT signing           | `your-secret-key`                 |

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License
This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.

---

## Contact
For questions or feedback, please contact:
- **Your Name** - mahamadounouridinem@gmail.com@example.com
- **GitHub**: [mahamadou-nouridine](https://github.com/mahamadou-nouridine)

---

Thank you for using the Employee Management System! 🚀
