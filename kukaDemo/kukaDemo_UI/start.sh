#!/bin/bash
set -e
set -u
. config/config.sh
. util.sh

nodemon index
