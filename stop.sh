#!/bin/bash

if [[ -e "locota.pid" ]]; then
	PID=`cat ./locota.pid`
	echo "Killing process stored in locota.pid, $PID"
	kill -9 $PID
	rm -f ./locota.pid
fi