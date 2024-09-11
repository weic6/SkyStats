#!/bin/bash

# the script will start a full stack project
echo "Starting Redis server..."
redis-server &
REDIS_PID=$!

# Wait for Redis to start up
sleep 2

echo "Starting backend..."
cd "$(dirname "$0")"  # Move to the script's directory, assumed to be the project root
npm start &
MAIN_PROJECT_PID=$!

# Wait for the main project to be up and running
sleep 2

_port = 3001
echo "Starting frontend (flight-dashboard) on port ${_port}..."
cd flight-dashboard
PORT=$_port npm start &
FLIGHT_DASHBOARD_PID=$!

# Capture SIGINT and SIGTERM for graceful shutdown
trap "echo 'Shutting down...'; kill $FLIGHT_DASHBOARD_PID; kill $MAIN_PROJECT_PID; kill $REDIS_PID; exit 1" SIGINT SIGTERM


## it does not work. need to modify it!!! (04/12)