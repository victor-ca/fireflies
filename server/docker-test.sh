#!/bin/bash
docker compose -f ../dev-ops/docker-compose-dev.yml stop
docker compose -f ../dev-ops/docker-compose-back-and-dev.yml -p fireflies-backend-test up