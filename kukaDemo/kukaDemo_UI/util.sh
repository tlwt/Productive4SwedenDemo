#!/bin/bash

ethnode_interactive () {
    DOCKER_OPTS+=(-it)
    ethnode "${@}"
}

ethnode () {
    if [ -n "${DEBUG}" ]; then
        echo sudo docker run "${DOCKER_OPTS[@]}" "${GOCLIENT}:${GOCLIENT_TAG}" "${@}" 1>&2
    fi
    sudo docker run "${DOCKER_OPTS[@]}" "${GOCLIENT}:${GOCLIENT_TAG}" "${@}"
}

ethnode_ip () {
    sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$1"
}

ethnode_keyhash () {
    # $1: account number
    account=0
    if [ $# -ge 1 ]; then
        account=$1
    fi
    ethnode geth account list | sed -ne "s/^Account #${account}: {\([a-zA-Z0-9]*\)}.*/\1/p"
    #ethnode geth account list | sed -ne 's/^Account #0: {\([a-zA-Z0-9]\+\)}.*/\1/p'
}

msg () {
    echo "------------------------- MESSAGE -------------------------"
    echo "${@}"
    echo "-----------------------------------------------------------"
}
