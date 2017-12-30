#!/bin/bash

echo "Setting up, run tests and build server"

serverDir=$(pwd)
python_path=$serverDir:$serverDir/server
export PYTHONPATH=$python_path
export REACT_APP_USERS_SERVICE_URL=http://localhost:5000
virtualenv bsmPythonEnv

. bsmPythonEnv/bin/activate
pip3 install -r server/requirements.txt

cd client
npm install
cd ..

cd server
echo "Running server tests..."
python3 test/boardTest.py


echo "Starting server in background"
python3 run.py &
SERVER_PID=$!

sleep 5

cd ../client
echo "running front end tests"
sleep 2
echo "Launching front end..."

npm start & 
CLIENT_PID=$!
sleep 5

read -p "Press any key to terminate shell script... \n" -n1 -s

echo "Closing client"
kill $CLIENT_PID
echo "terminating server"
kill $SERVER_PID

