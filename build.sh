#!/bin/bash

echo "Setting up, run tests and build server"

serverDir=$(pwd)
python_path=$serverDir:$serverDir/server
export PYTHONPATH=$python_path
source bsmfs.env
virtualenv bsmPythonEnv

source bsmPythonEnv/bin/activate
pip3 install -r server/requirements.txt


cd server
echo "Running server tests..."
python3 test/boardTest.py


echo "Starting server in background"
python3 run.py # &
# SERVER_PID=$!

sleep 5

# read -p "Press any key to terminate shell script... \n" -n1 -s


# echo "terminating server"
# kill $SERVER_PID

