#!/bin/bash

node app.js &

PID=$!

sleep 5

curl -f http://localhost:80/health

STATUS=$?

kill $PID

exit $STATUS