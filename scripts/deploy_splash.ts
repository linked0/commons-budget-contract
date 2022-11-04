import { NonceManager } from "@ethersproject/experimental";
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { GasPriceManager } from "../utils/GasPriceManager";

async function main() {
    const SplashWorld = await ethers.getContractFactory("Splash");
    const provider = ethers.provider;

    const admin = new Wallet(process.env.ADMIN_KEY || "");
    const adminSigner = new NonceManager(new GasPriceManager(provider.getSigner(admin.address)));

    const splashWorld = await SplashWorld.connect(adminSigner).deploy("SplashWorld", "SPWD");
    await splashWorld.deployed();
    console.log("Success! Contract was deployed to: ", splashWorld.address);

    await splashWorld.mint("https://ipfs.io/ipfs/QmXeKHxP9C6Er3pSUGRoErU2dSTZxXRcBeaRP5NWYbk9Pa");
    console.log("NFT successfully minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
