#!/bin/bash
set -e
cd server
docker build -t fireflies-backend .
docker compose -f ../dev-ops/docker-compose-dev.yml stop
docker compose -f ../dev-ops/docker-compose-back-and-dev.yml -p fireflies-backend-test down
docker compose -f ../dev-ops/docker-compose-back-and-dev.yml -p fireflies-backend-test up