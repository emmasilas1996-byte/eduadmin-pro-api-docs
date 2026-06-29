# EduAdmin Pro API Documentation

> **Portfolio note:** This is the official API documentation for EduAdmin Pro v2.1 —
> a full-stack school management system built with React 18, Node/Express, and SQL Server.
> It demonstrates production-level technical writing across reference docs, conceptual guides,
> quickstart tutorials, and a complete OpenAPI specification.

---

## What's in this repo

```
eduadmin-api-docs/
├── openapi.yaml                  # Full OpenAPI 3.0.3 specification (Swagger-compatible)
├── docusaurus.config.js          # Docusaurus site config + sidebar structure
└── docs/
    ├── introduction.md           # API overview, request format, error handling
    ├── quickstart.md             # 5-minute getting-started guide
    ├── auth/
    │   └── authentication.md    # JWT auth, register, login, refresh, role permissions
    ├── students/
    │   └── students.md          # Full student lifecycle CRUD
    ├── fees/
    │   └── fees.md              # Fee creation, payment recording, Paystack integration
    └── grades/
        └── grades.md            # Score submission and report card generation
```

## How to render

### Option A: Swagger UI (OpenAPI spec)

Paste `openapi.yaml` into [editor.swagger.io](https://editor.swagger.io) to render
interactive API documentation instantly.

Alternatively, serve it locally:

```bash
npx @redocly/cli preview-docs openapi.yaml
```

### Option B: Docusaurus site

```bash
npx create-docusaurus@latest my-api-docs classic
cd my-api-docs
cp -r ../docs ./docs
cp ../docusaurus.config.js .
npm start
```

---

## Tech stack (the project this API backs)

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | Microsoft SQL Server |
| Auth | JWT (jsonwebtoken) |
| Hosting | AWS (EC2 + RDS) |

---

## Contact

Built by Emmanuel — product implementation specialist and technical writer in training.

[LinkedIn](#) · [GitHub](#)
