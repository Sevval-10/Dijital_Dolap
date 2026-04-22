# Digital Closet and Smart Outfit Recommendation System

This repository contains a full-stack MVP for a wardrobe management platform that:

- stores clothing items in a digital closet,
- tracks category and seasonal usage,
- considers color harmony and weather conditions,
- generates smart outfit suggestions,
- exposes automation hooks for n8n.

## Stack

- Frontend: React, Vite, ES6+
- Backend: Node.js, Express
- Database: PostgreSQL
- Uploads: Multer
- AI: Gemini API integration
- Automation: n8n webhook support
- Infra: Docker, Docker Compose

## Project structure

- `client`: React application
- `server`: Express REST API
- `db/init`: PostgreSQL bootstrap SQL
- `n8n`: example workflow JSON

## Quick start

1. Copy `.env.example` values into `server/.env`.
2. Install dependencies:

```bash
npm install
```

3. Start with Docker:

```bash
docker compose up --build
```

4. Or run locally:

```bash
npm run dev
```

## n8n test flow

If your frontend and backend are running locally with `npm run dev`, but PostgreSQL and n8n are in Docker:

1. Start PostgreSQL if needed:

```bash
docker compose up db
```

2. Start n8n:

```bash
docker compose up n8n
```

3. Open n8n:

```text
http://localhost:5678
```

4. Import `n8n/digital-closet-webhook-local.json`.
5. Click `Test workflow`.
6. Trigger the webhook URL shown by n8n with a POST request.
7. The workflow forwards the payload to `POST /api/automation/n8n/webhook`.

Note:
- Use `digital-closet-webhook-local.json` when the app runs locally with `npm run dev`.
- Use `digital-closet-webhook.json` when both n8n and the API run together in Docker and the API is reachable as `http://server:5000`.

## Core API endpoints

- `GET /api/health`
- `GET /api/clothes`
- `POST /api/clothes`
- `POST /api/clothes/upload`
- `GET /api/outfits/recommendation?occasion=casual`
- `GET /api/dashboard/summary`
- `POST /api/automation/n8n/webhook`

## Environment

See `.env.example` for available variables.
