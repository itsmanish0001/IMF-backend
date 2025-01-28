# IMF Gadgets API

The **IMF Gadgets API** is a RESTful API designed to manage gadgets for the Impossible Missions Force (IMF). It supports JWT authentication and role-based authorization, ensuring secure and controlled access to the API routes.

## Features
- **Admin User**: Full CRUD access to all gadgets.
- **Normal User**: Read-only access to fetch the list of gadgets.
- Secure authentication using JSON Web Tokens (JWT).

---

## Authentication and Authorization

### Admin User
- **Secret Code**: `admin123`
- Permissions: Create, Read, Update, Delete gadgets.

### Normal User
- **Secret Code**: `normalUser123`
- Permissions: Read-only access to fetch the list of gadgets.

---

## Authentication Flow

### Login Request (Admin or Normal User):
**POST** `/login`

#### Request Body:
```json
{
  "secretCode": "your_secret_code"
}
```

#### Response:
```json
{
  "token": "jwt_token"
}
```

### Accessing Protected Routes:
Include the JWT token in the `Authorization` header as:
```
Bearer <token>
```

---

## Example Routes

| Route                  | Method | Access          | Description                       |
|------------------------|--------|-----------------|-----------------------------------|
| `/gadgets`             | GET    | Admin, Normal   | Fetch the list of all gadgets.   |
| `/gadgets`             | POST   | Admin           | Create a new gadget.             |
| `/gadgets/:id`         | PUT    | Admin           | Update an existing gadget.       |
| `/gadgets/:id`         | DELETE | Admin           | Delete an existing gadget.       |

---

## Technologies Used
- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for creating routes and handling requests.
- **JWT (JSON Web Token)**: Secure authentication and authorization.
- **PostgreSQL**: Database for managing gadget data.

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd imf-gadgets-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     JWT_SECRET=your_jwt_secret
     DATABASE_URL=your_postgresql_database_url
     ```
4. Start the server:
   ```bash
   npm start
   ```

---

## Usage
### Admin Login Example
#### Request:
```bash
POST /login
```
#### Body:
```json
{
  "secretCode": "admin123"
}
```
#### Response:
```json
{
  "token": "jwt_token"
}
```

### Normal User Login Example
#### Request:
```bash
POST /login
```
#### Body:
```json
{
  "secretCode": "normalUser123"
}
```
#### Response:
```json
{
  "token": "jwt_token"
}
```

### Fetch Gadgets Example
#### Request:
```bash
GET /gadgets
Authorization: Bearer <token>
```
#### Response:
```json
[
  {
    "id": 1,
    "name": "Gadget 1",
    "description": "Description of gadget 1."
  },
  {
    "id": 2,
    "name": "Gadget 2",
    "description": "Description of gadget 2."
  }
]
```

---



## Contributing
Feel free to fork this repository and create pull requests for improvements or bug fixes.
