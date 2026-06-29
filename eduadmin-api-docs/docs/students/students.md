# Students

The Students API manages student records throughout their lifecycle — from initial enrolment
to graduation or withdrawal.

All student IDs follow the format `STU-{YEAR}-{SEQUENCE}` (e.g., `STU-2024-00042`).

---

## List Students

Returns a paginated list of students. Filter by class, status, or search by name or ID.

```
GET /students
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | Page number (default: `1`) |
| `per_page` | integer | Results per page (default: `20`, max: `100`) |
| `class_id` | string | Filter by class ID |
| `status` | string | One of: `active`, `inactive`, `graduated`, `withdrawn` |
| `search` | string | Search by full name or student ID |

### Example request

```bash
curl -X GET "https://api.eduadminpro.com/v1/students?class_id=CLS-2024-00003&status=active" \
  -H "Authorization: Bearer <your_token>"
```

### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "STU-2024-00042",
      "first_name": "Chukwuemeka",
      "last_name": "Obi",
      "email": "c.obi@student.school.edu.ng",
      "class_id": "CLS-2024-00003",
      "enrollment_date": "2024-09-01",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 145,
    "total_pages": 8
  }
}
```

---

## Enrol a Student

Creates a new student record.

```
POST /students
```

### Request body

```json
{
  "first_name": "Chukwuemeka",
  "last_name": "Obi",
  "email": "c.obi@student.school.edu.ng",
  "phone": "+2348012345678",
  "class_id": "CLS-2024-00003",
  "enrollment_date": "2024-09-01"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `first_name` | string | Yes | |
| `last_name` | string | Yes | |
| `email` | string | Yes | Must be unique across all students |
| `phone` | string | No | Nigerian format preferred |
| `class_id` | string | Yes | Must reference an existing class |
| `enrollment_date` | string | No | ISO 8601 date. Defaults to today |

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "STU-2024-00043",
    "first_name": "Chukwuemeka",
    "last_name": "Obi",
    "email": "c.obi@student.school.edu.ng",
    "phone": "+2348012345678",
    "class_id": "CLS-2024-00003",
    "enrollment_date": "2024-09-01",
    "status": "active"
  }
}
```

---

## Get a Student

Returns the full record for a single student.

```
GET /students/{id}
```

### Example request

```bash
curl -X GET "https://api.eduadminpro.com/v1/students/STU-2024-00042" \
  -H "Authorization: Bearer <your_token>"
```

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "STU-2024-00042",
    "first_name": "Chukwuemeka",
    "last_name": "Obi",
    "email": "c.obi@student.school.edu.ng",
    "phone": "+2348012345678",
    "class_id": "CLS-2024-00003",
    "enrollment_date": "2024-09-01",
    "status": "active"
  }
}
```

### Error: Not found `404`

```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## Update a Student

Updates one or more fields on a student record. You only need to include the fields you
want to change.

```
PUT /students/{id}
```

### Example: Updating a student's class

```json
{
  "class_id": "CLS-2024-00005"
}
```

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "STU-2024-00042",
    "class_id": "CLS-2024-00005",
    ...
  },
  "message": "Student record updated"
}
```

---

## Withdraw a Student

Marks a student as `withdrawn`. This does not delete the student record — all historical
data (grades, fees, attendance) is preserved.

```
DELETE /students/{id}
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Student STU-2024-00042 has been withdrawn"
}
```

> To permanently delete a student record, contact your system administrator.
> Hard deletes are not available via the API.
