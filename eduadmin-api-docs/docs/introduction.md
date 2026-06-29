# EduAdmin Pro API

The EduAdmin Pro API is a RESTful API that gives you programmatic access to all school
management operations — from student enrolment and fee collection to academic results and
timetabling.

## Who is this for?

This API is built for:

- **School developers** building custom integrations with third-party tools (payment gateways,
  SMS services, LMS platforms)
- **System integrators** connecting EduAdmin Pro to existing school infrastructure
- **Internal teams** automating administrative workflows

---

## Base URL

All API requests use the following base URL:

```
https://api.eduadminpro.com/v1
```

A staging environment is available for testing:

```
https://staging-api.eduadminpro.com/v1
```

> **Note:** Never use production credentials in your staging environment. Maintain separate
> accounts for each.

---

## Request Format

All requests must include the following headers:

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer <your_token>` |

Request bodies must be valid JSON. All timestamps are in **ISO 8601** format
(`2024-09-01T08:00:00Z`), and monetary values are in **Nigerian Naira (NGN)** unless
otherwise specified.

---

## Response Envelope

Every API response wraps its data in a consistent envelope:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

The `meta` object is only present on list responses. For single-resource responses, `data`
contains the resource object directly.

---

## HTTP Status Codes

| Code | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Malformed request syntax |
| `401 Unauthorized` | Missing or invalid token |
| `403 Forbidden` | Valid token, but insufficient permissions |
| `404 Not Found` | Resource does not exist |
| `422 Unprocessable Entity` | Validation error on request body |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Server-side error |

---

## Error Format

Errors follow a standard structure:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email address is already in use"
    }
  ]
}
```

---

## Rate Limiting

Requests are limited to **300 per minute** per token. Rate limit status is communicated
through response headers:

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 287
X-RateLimit-Reset: 1725000060
```

When you exceed the limit, the API returns a `429` response. Wait until the reset timestamp
before retrying.

---

## Versioning

The API version is included in the base URL (`/v1`). Breaking changes will be released under
a new version prefix. You will receive advance notice of any deprecations via email before
an old version is retired.
