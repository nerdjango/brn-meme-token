import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Operation started");
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Dracarys = await ethers.getContractFactory("Dracarys");
    const dracarys = await Dracarys.deploy();
    await dracarys.deployed();
    console.log(`Dracarys token deployed to ${dracarys.address}`);

    const SwapPool = await ethers.getContractFactory("SwapPool");
    const swapPool = await SwapPool.deploy(dracarys.address);
    await swapPool.deployed();
    console.log(`Swap pool deployed to ${swapPool.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
