#!/bin/bash

export TEST=true
docker-compose up -d

cd ../../
npm run migrate
npm run seeders

cd - || exit