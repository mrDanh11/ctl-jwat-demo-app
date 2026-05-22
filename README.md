# JWAT Project

## Project Structure
- `/client`: Next.js frontend application.
- `/server`: NestJS backend application.
- `docker-compose.yml`: Infrastructure setup (PostgreSQL).

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

### 1. Backend & Infrastructure (Database)
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file from the following template:
   ```env
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   PORT=
   ```
3. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```
4. Install dependencies and start the server:
   ```bash
   npm install
   npm run start:dev
   ```
   The backend will be running at `http://localhost:3002`.

### 2. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will be running at `http://localhost:3000`.

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at `http://localhost:3000`.

## Features
- Next.js 15 (App Router)
- NestJS with TypeScript
- TypeORM (Coming soon)
- PostgreSQL with Docker
- Centralized configuration management
