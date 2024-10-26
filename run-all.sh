#!/bin/bash

# Function to run the backend
run_backend() {
    echo "Starting backend..."
    cd server
    npm install
    npm run start:database
    npm start &
    backend_pid=$!
    cd ..
}

# Function to run the frontend
run_frontend() {
    echo "Starting frontend..."
    cd client
    npm install
    npm run dev &
    frontend_pid=$!
    cd ..
}

# Function to stop all processes
stop_all() {
    echo "Stopping all processes..."
    kill $backend_pid $frontend_pid
    npm run stop:database
    exit 0
}

# Set up trap to catch Ctrl+C
trap stop_all INT

# Run both backend and frontend
run_backend
run_frontend

echo "Both backend and frontend are now running."
echo "Press Ctrl+C to stop all processes."

# Wait for user input to keep the script running
wait $backend_pid $frontend_pid
