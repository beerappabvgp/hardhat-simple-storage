const { ethers , run, network } = require("hardhat");

const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract");
    const simpleStorage = await SimpleStorageFactory.deploy();  
    await simpleStorage.waitForDeployment();
    if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6);
        await verify(simpleStorage.target)
    }
    
    const currentValue = await simpleStorage.retrieve();
    console.log(`current value : ${currentValue}`);
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`updated value is : ${updatedValue}`);


}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract");
    try {
        await run("verify:verify" , {
            address: contractAddress,
            constructorArguments: args,
        }); 
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
    
}

main().then(() => process.exit(0))
.catch((error) => {
    console.log(error);
})