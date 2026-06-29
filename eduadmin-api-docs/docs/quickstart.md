# Quickstart

This guide walks you through making your first API request in under 5 minutes.
By the end, you will have authenticated and retrieved a list of students.

## Prerequisites

- An EduAdmin Pro account with at least `admin` role
- A terminal with `curl`, or an API client like Postman

---

## Step 1: Obtain a Token

Call the login endpoint with your credentials:

```bash
curl -X POST https://api.eduadminpro.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.edu.ng",
    "password": "your-password"
  }'
```

**Response:**

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

Copy the value of `token`. You will use it in every subsequent request.

---

## Step 2: Make an Authenticated Request

Pass the token as a Bearer token in the `Authorization` header:

```bash
curl -X GET https://api.eduadminpro.com/v1/students \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "STU-2024-00001",
      "first_name": "Adaeze",
      "last_name": "Nwosu",
      "class_id": "CLS-2024-00001",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 312
  }
}
```

You're in. From here, explore the rest of the API using the endpoint guides.

---

## Step 3: Try a Common Workflow

Here is a typical end-of-term workflow using the API:

### 1. Fetch all active students in a class

```bash
GET /students?class_id=CLS-2024-00003&status=active
```

### 2. Submit grades for each student

```bash
POST /grades
{
  "student_id": "STU-2024-00042",
  "subject_id": "SUB-2024-00005",
  "term": "second",
  "score": 87.5
}
```

### 3. Generate the report card

```bash
GET /grades/report/STU-2024-00042?term=second&session=2023/2024
```

### 4. Check outstanding fees before releasing results

```bash
GET /fees?student_id=STU-2024-00042&status=pending
```

---

## Next Steps

- [Authentication](./auth/authentication.md) — Understand roles and token management
- [Students](./students/students.md) — Full student lifecycle management
- [Fees](./fees/fees.md) — Fee collection and payment gateway integration
- [Grades](./grades/grades.md) — Score submission and report card generation
