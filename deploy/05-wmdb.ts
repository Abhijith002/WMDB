import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployWMDB: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Web3 Movie Database and waiting for confirmations...")
  const WMDB = await deploy("WMDB", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: 1,
  })
  log(`WMDB at ${WMDB.address}`)
  const WMDBContract = await ethers.getContractAt("WMDB", WMDB.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await WMDBContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deployWMDB
deployWMDB.tags = ["all", "WMDB"]