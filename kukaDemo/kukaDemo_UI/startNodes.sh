#!/bin/bash
set -e
set -u

. config/config.sh
. util.sh

# documentation: https://github.com/ethereum/go-ethereum/wiki/Private-network

BOOTNODE_HASH=$(ethnode bootnode --nodekey "${DATADIR_NODE}/${BOOTNODE_KEY}" -writeaddress)

# start the Bootnode
bootnode_start () {
    # DOCKER_OPTS+=(-d -p ${BOOTNODE_PORT}:${BOOTNODE_PORT})
    DOCKER_OPTS+=(-d)
    CID=$(ethnode bootnode --nodekey "${DATADIR_NODE}/${BOOTNODE_KEY}" --verbosity 9 --addr :"${BOOTNODE_PORT}")
    echo "$CID"
}

msg "Starting bootnode"
BOOTNODE_CID=$(bootnode_start)
BOOTNODE_IP=$(ethnode_ip "$BOOTNODE_CID")

node_start () {
    i=0
    keyhashes=
    for account in "${ACCOUNTS[@]}"; do
        if [ $i -gt 0 ]; then
            keyhashes="${keyhashes},"
        fi
        keyhashes="${keyhashes}$(ethnode_keyhash "${i}")"
        i=$(($i+1))
    done

    DOCKER_OPTS+=(-it -p "127.0.0.1:${NODE_RPCPORT}:${NODE_RPCPORT}" -p "127.0.0.1:${NODE_WSPORT}:${NODE_WSPORT}")
    ethnode geth --identity "miner1" --ws --wsport="${NODE_WSPORT}" --wsorigins="*" --wsaddr="[::]" --rpc --rpcport "${NODE_RPCPORT}" --rpcaddr="[::]" --bootnodes "enode://${BOOTNODE_HASH}@${BOOTNODE_IP}:${BOOTNODE_PORT}" --port "${NODE_NETPORT}" --unlock "${keyhashes}" --password "${DATADIR_NODE}/${NODE_PASSWORDS}" --rpccorsdomain "*" --networkid "${NETWORKID}" --mine --minerthreads=1 console
}

msg "Starting geth node"
node_start

msg "All nodes up and running, press enter to destroy nodes"
read

msg "Destroying nodes"
sudo docker kill "${BOOTNODE_CID}"

# geth --datadir miner1 --identity "miner1" --rpc --rpcport 8501 --bootnodes 'enode://6eb4ec52b06b2f519d3fe05e57fc143ff3f981f302611d454eb421578291b5ed6fb2937c9c9c4f614b7feb8991d8a5c2ad02c1989254bdf1227e757cb44677f6@192.168.178.26:30317' --port 30318 --unlock 0 --password /Users/winneberger/Mindchains/Blockchain_DevEnvironment/password.txt --rpccorsdomain "*" mine console
