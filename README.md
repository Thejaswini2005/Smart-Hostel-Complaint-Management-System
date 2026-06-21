# Smart Hostel Complaint Management System

A full-stack MERN application developed to streamline hostel complaint management between students and wardens. The system enables students to submit and track complaints online while allowing wardens to monitor, manage, and resolve complaints efficiently through a centralized dashboard.

---

## Features

### Student Module

* User registration and login
* JWT-based authentication
* Create complaints
* View complaint history
* Track complaint status (Pending, In Progress, Resolved)
* Delete own complaints
* Manage profile

### Warden Module

* Secure login
* View all complaints
* Update complaint status
* Monitor complaint statistics
* View pending complaints dashboard
* Manage profile

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcryptjs
* Role-Based Access Control (RBAC)

---

## Complaint Workflow

```text
Pending → In Progress → Resolved
```

### Status Transition Rules

| From        | To          | Allowed |
| ----------- | ----------- | ------- |
| Pending     | In Progress | ✅       |
| Pending     | Resolved    | ✅       |
| In Progress | Resolved    | ✅       |
| In Progress | Pending     | ❌       |
| Resolved    | Pending     | ❌       |
| Resolved    | In Progress | ❌       |

---

## Project Structure

### Frontend

* Components
* Pages
* Services
* Routing
* Stylesheets

### Backend

* Controllers
* Models
* Routes
* Middleware
* Database Configuration

---

## REST API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Complaints

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| POST   | `/api/complaints`            | Create a complaint          |
| GET    | `/api/complaints`            | Get student's complaints    |
| GET    | `/api/complaints/all`        | Get all complaints (Warden) |
| PUT    | `/api/complaints/:id/status` | Update complaint status     |
| DELETE | `/api/complaints/:id`        | Delete complaint            |

---

## Security Features

* Password hashing using bcryptjs
* JWT authentication
* Protected routes
* Role-based authorization
* Secure API access

---

## Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Netlify       |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## Future Enhancements

* Real-time notifications
* Email alerts
* Complaint priority levels
* Complaint analytics dashboard
* Mobile application support
* Complaint search and filtering

---

## Author

**Thejaswini Gangavaram**
B.Tech Computer Science and Engineering
National Institute of Technology (NIT) Raipur
