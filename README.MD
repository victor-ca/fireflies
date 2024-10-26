# Fireflies.ai Backend Test

## Quick Start

To run the project locally, follow these steps:

1. Ensure you have Docker and Node.js (v22+) installed.

2. Clone the repository and navigate to the project root.

3. Run the following command to start both backend and frontend:

   ```bash
   ./run-all.sh
   ```

   This script will:

   - Start the MongoDB database
   - Install dependencies for both backend and frontend
   - Run the backend server
   - Run the frontend development server

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Docker Test

To run the backend in a Docker container, use the `./docker-test.sh` script.
it will automatically build the image and run in docker composer with the backend and the database.

## Project structure

- `server/`: contains the backend code

  - `npm run dev` to start the server standalone
  - `npm run seed` to seed the database with some data

- `client/`: contains the frontend code

  - Run: `npm run dev`

- `dev-ops/`: contains the docker compose files
