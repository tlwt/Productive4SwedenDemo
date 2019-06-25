#!/bin/bash
set -e
set -u

. config/config.sh
. util.sh

msg "Installing node dependencies"
yarn install

msg "Building web application"
yarn run build
