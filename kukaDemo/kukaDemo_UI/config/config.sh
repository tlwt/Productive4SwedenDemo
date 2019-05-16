#!/bin/bash

export DEBUG="1"
export APP_PORT=3000
export GENESISBLOCK_TEMPLATE="genesisblock_template.json"
export GENESISBLOCK="genesisblock.json"
export BOOTNODE_KEY="boot.key"
export BOOTNODE_PORT=30317
export CONFIGDIR_NODE="/root/config"
export DATADIR="datadir"
export DATADIR_NODE="/root/.ethereum"
export DAGDIR="${DATADIR}/ethash"
export DAGDIR_NODE="/root/.ethash"
export GOCLIENT="ethereum/client-go"
export GOCLIENT_TAG="alltools-stable"
export NETWORKID="${NETWORKID:=8015}"
export ACCOUNTS=(CUSTOMER SELLER DELIVERYSERVICE)
export ACCOUNT_CUSTOMER_PASSWORD="customer.password"
export ACCOUNT_SELLER_PASSWORD="seller.password"
export ACCOUNT_DELIVERYSERVICE_PASSWORD="deliveryservice.password"
export NODE_PASSWORDS="geth.passwords" # combines all separate accounts passwords
export NODE_RPCPORT=8545
export NODE_WSPORT=8546
export NODE_NETPORT=30303
export DOCKER_OPTS=(-v "${PWD}/${DATADIR}:${DATADIR_NODE}" -v "${PWD}/${DAGDIR}:${DAGDIR_NODE}")
