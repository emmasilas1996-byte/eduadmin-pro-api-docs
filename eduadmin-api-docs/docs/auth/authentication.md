# Authentication

EduAdmin Pro uses **JWT (JSON Web Token)** Bearer authentication. Every request to a
protected endpoint must include a valid token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

Tokens expire after **24 hours**. Use the refresh endpoint to obtain a new token without
requiring the user to log in again.

---

## Register

Creates a new user account. Use this endpoint to onboard admin users, teachers, students,
or parents.

```
POST /auth/register
```

### Request body

```json
{
  "first_name": "Ngozi",
  "last_name": "Adeyemi",
  "email": "ngozi.adeyemi@school.edu.ng",
  "password": "P@ssw0rd!",
  "role": "teacher"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `first_name` | string | Yes | User's first name |
| `last_name` | string | Yes | User's last name |
| `email` | string | Yes | Must be a valid, unique email address |
| `password` | string | Yes | Minimum 8 characters |
| `role` | string | Yes | One of: `admin`, `teacher`, `student`, `parent` |

> Only a `super_admin` can register a new `admin`. All other roles can self-register.

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "USR-2024-00015",
    "email": "ngozi.adeyemi@school.edu.ng",
    "role": "teacher",
    "created_at": "2024-09-01T08:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Log In

Authenticates a user and returns a JWT token.

```
POST /auth/login
```

### Request body

```json
{
  "email": "admin@school.edu.ng",
  "password": "P@ssw0rd!"
}
```

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "USR-2024-00001",
      "email": "admin@school.edu.ng",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

`expires_in` is the token lifetime in seconds (86400 = 24 hours).

### Error: Invalid credentials `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Refresh Token

Issues a new token before the current one expires. Call this proactively — once a token
expires, you must log in again.

```
POST /auth/refresh
```

Include the current (still-valid) token in the `Authorization` header. No request body
is required.

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

---

## Log Out

Invalidates the current token server-side. After logout, the token cannot be refreshed
or used for authenticated requests.

```
POST /auth/logout
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Role Permissions Reference

| Endpoint Group | super_admin | admin | teacher | student | parent |
|---|---|---|---|---|---|
| Auth | ✅ | ✅ | ✅ | ✅ | ✅ |
| Students | ✅ | ✅ | Read only | Own record | Linked record |
| Staff | ✅ | ✅ | Read only | ❌ | ❌ |
| Fees | ✅ | ✅ | ❌ | Own record | Linked record |
| Grades | ✅ | ✅ | Own classes | Own record | Linked record |
| Classes | ✅ | ✅ | Assigned | ❌ | ❌ |
| Admin | ✅ | ✅ | ❌ | ❌ | ❌ |
