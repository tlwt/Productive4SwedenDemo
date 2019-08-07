module.exports = {
    PORT: process.envAPP_PORT ? Number(process.env.APP_PORT) : 3000,
    STATIC_FILES: "dist",
    MINER_NODE: "0x4c3b1fc4aec2c9e2ae0b16259fcc3b457a96360e",
    CONTRACT: "contracts/statusContract.sol",
    ACCOUNT_CUSTOMER: "0x4c3b1fc4aec2c9e2ae0b16259fcc3b457a96360e",
    ACCOUNT_DELIVERYSERVICE: "0x4c3b1fc4aec2c9e2ae0b16259fcc3b457a96360e",
    ACCOUNT_SELLER: "0x4c3b1fc4aec2c9e2ae0b16259fcc3b457a96360e",
};
