module.exports = {
    DEFAULT_ADDRESS_ERC20: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
    TEST_ACCOUNT_ERC20: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
    JSON_INTERFACE_ERC20: [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "spender",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "from",
            "type": "address"
        }, {
            "name": "to",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "tokenOwner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "name": "balance",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "to",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "spender",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }, {
            "name": "data",
            "type": "bytes"
        }],
        "name": "approveAndCall",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "tokenAddress",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "transferAnyERC20Token",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "tokenOwner",
            "type": "address"
        }, {
            "name": "spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
            "name": "remaining",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "_newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "_from",
            "type": "address"
        }, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "tokenOwner",
            "type": "address"
        }, {
            "indexed": true,
            "name": "spender",
            "type": "address"
        }, {
            "indexed": false,
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }],
    CONTRACT_ADDRESS_ERC20: "0x8ea4f81c28204c5b81b1E0A973adB0d45e97F102",
    CONTRACT_ACCOUNT_ERC20: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
    CONTRACT_ADDRESS_SC: "0x1EF974bf8489ef071D458c4Aa5CFAd96DF48C302",
    JSON_INTERFACE_SC: [{
            "constant": true,
            "inputs": [],
            "name": "seller",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStatusToSent",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "status",
            "outputs": [{
                "name": "",
                "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStatusToReceived",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "delivery",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStatusToOnSite",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_seller",
                "type": "address"
            }],
            "name": "setStatusOrdered",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_delivery",
                "type": "address"
            }],
            "name": "setStatusToSelected",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStatusToDelivery",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStatusToRegistered",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_status",
                "type": "uint256"
            }],
            "name": "statusChanged",
            "type": "event"
        }
    ],
    CONTRACT_ACCOUNT_SC: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
    CONTRACT_ACCOUNT_SC_TEST: "0xa62d3efdce28cd79b2dd66aa919e83331fcc8c82",
    JSON_INTERFACE_STATE: [{
            "constant": true,
            "inputs": [],
            "name": "status",
            "outputs": [{
                "name": "",
                "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setStateToOrdered",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    CONTRACT_ADDRESS_STATE: "0xFB67d438789e2Bf96BD0e1B2A936Ad0777C79CF8",
    CONTRACT_ACCOUNT_STATE: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
    CONTRACT_ACCOUNT_STATE_TEST: "0xa62d3efdce28cd79b2dd66aa919e83331fcc8c82",
    CONTRACT_ADDRESS_FINAL: "0xAe6e9DB7E1Cd805247187324B1dbF809Ce745441",
    CONTRACT_ABI_FINAL: [{
        "constant": false,
        "inputs": [],
        "name": "setStateToDelivered",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "setStateToDelivery",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "setStateToOnsite",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "setStateToOrdered",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "setStateToRegistered",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "setStateToSelected",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getState",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "status",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }],
    CONTRACT_ACCOUNT_FINAL: "0x7FA6627136BccB2B3F61707c072da8eC847F027f",
}