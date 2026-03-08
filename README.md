# Pot Spotter

A web platform for reporting and tracking potholes across the GTA. Users can view reported potholes on an interactive map, submit new reports with images, upvote/downvote reports, and view dashboard analytics. AI (Gemini) automatically classifies pothole severity from uploaded photos.

## Tech Stack

**Frontend** — Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / Leaflet.js / Gemini

**Backend** — Spring Boot 3.5 / Java 21 / PostgreSQL (Supabase) / Spring Security (JWT) / Cloudinary

## Prerequisites

- Java 21
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Cloudinary account
- Google Gemini API key

## Environment Variables

### Backend (`backend/.env`)

```
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<db>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
JWT_SECRET_KEY=<your-jwt-secret>
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

### Frontend (`frontend/.env`)

```
GEMINI_API_KEY=<your-gemini-api-key>
```

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env   # Create .env and fill in values
./gradlew bootRun       # Starts on http://localhost:8080
```

### Frontend

```bash
cd frontend
cp .env.example .env   # Create .env and fill in values
npm install
npm run dev            # Starts on http://localhost:3000
```

## Build

```bash
# Backend
cd backend && ./gradlew clean build

# Frontend
cd frontend && npm run build && npm start
```

## Project Structure

```
potspotter/
  backend/                 # Spring Boot REST API
    src/main/java/...
      config/              # Security, JWT filter, Cloudinary config
      controller/          # REST controllers
      dto/                 # Data transfer objects
      model/               # JPA entities
      repository/          # Spring Data repositories
      service/             # Business logic
  frontend/                # Next.js app
    src/
      app/                 # App Router pages + API routes
        api/analyze/       # Gemini classification route
        auth/              # Login & signup pages
        dashboard/         # Dashboard page
      components/          # React components
      context/             # AuthContext
      api/                 # Axios instance
      service/             # API service functions
```
