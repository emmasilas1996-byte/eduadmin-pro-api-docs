# Grades & Results

The Grades API handles score submission, grade retrieval, and report card generation. It is
designed for use by teachers entering scores and by external systems generating printed report
cards or SMS notifications to parents.

---

## List Grades

Returns grade records filtered by student, subject, or term.

```
GET /grades
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `student_id` | string | Filter by student |
| `subject_id` | string | Filter by subject |
| `term` | string | One of: `first`, `second`, `third` |
| `page` | integer | Default: `1` |
| `per_page` | integer | Default: `20` |

### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "GRD-2024-00200",
      "student_id": "STU-2024-00042",
      "subject_id": "SUB-2024-00005",
      "term": "second",
      "score": 87.5,
      "grade": "A",
      "remarks": "Excellent performance"
    }
  ]
}
```

---

## Submit a Grade

Records a score for a student in a specific subject and term. Teachers can only submit grades
for subjects assigned to their classes.

```
POST /grades
```

### Request body

```json
{
  "student_id": "STU-2024-00042",
  "subject_id": "SUB-2024-00005",
  "term": "second",
  "score": 87.5,
  "remarks": "Excellent performance"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `student_id` | string | Yes | |
| `subject_id` | string | Yes | Must be assigned to the student's class |
| `term` | string | Yes | One of: `first`, `second`, `third` |
| `score` | number | Yes | Value between `0` and `100` |
| `remarks` | string | No | Teacher's comments |

The API automatically calculates the letter grade based on the school's configured grading
scale (set in Admin Settings):

| Score | Grade |
|---|---|
| 70 – 100 | A |
| 60 – 69 | B |
| 50 – 59 | C |
| 45 – 49 | D |
| 0 – 44 | F |

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "GRD-2024-00201",
    "student_id": "STU-2024-00042",
    "subject_id": "SUB-2024-00005",
    "term": "second",
    "score": 87.5,
    "grade": "A",
    "remarks": "Excellent performance"
  }
}
```

---

## Get Student Report Card

Returns a complete academic report for a student for a given term and session. Use this
endpoint to generate printed report cards or send automated result notifications.

```
GET /grades/report/{student_id}
```

### Path parameters

| Parameter | Description |
|---|---|
| `student_id` | The student's ID (e.g., `STU-2024-00042`) |

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `term` | string | One of: `first`, `second`, `third` |
| `session` | string | Academic session, e.g., `2023/2024` |

### Example request

```bash
curl -X GET \
  "https://api.eduadminpro.com/v1/grades/report/STU-2024-00042?term=second&session=2023/2024" \
  -H "Authorization: Bearer <your_token>"
```

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "student": {
      "id": "STU-2024-00042",
      "name": "Chukwuemeka Obi",
      "class": "JSS 2A"
    },
    "session": "2023/2024",
    "term": "second",
    "subjects": [
      {
        "subject": "Mathematics",
        "score": 87.5,
        "grade": "A",
        "remarks": "Excellent performance"
      },
      {
        "subject": "English Language",
        "score": 74.0,
        "grade": "B",
        "remarks": "Good"
      },
      {
        "subject": "Basic Science",
        "score": 65.0,
        "grade": "B",
        "remarks": "Satisfactory"
      }
    ],
    "summary": {
      "total_score": 226.5,
      "average": 75.5,
      "position": 3,
      "total_students": 35,
      "grade": "B"
    },
    "teacher_comment": "Chukwuemeka is a dedicated student. Keep it up.",
    "principal_comment": "Good result. Aim higher next term."
  }
}
```
