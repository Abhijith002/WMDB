import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying TimeLock and waiting for confirmations...")
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [1, [], []],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: 1,
  })
  log(`TimeLock at ${timeLock.address}`)
}

export default deployTimeLock
deployTimeLock.tags = ["all", "timelock"]