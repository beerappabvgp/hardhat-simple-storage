const { ethers } = require("hardhat");

const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
    console.log("deployed");
}

main().then(() => process.exit(0))
.catch((error) => {
    console.log(error);
})