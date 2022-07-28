import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const governanceToken = await get("WMDBToken")
  const timeLock = await get("TimeLock")

  log("----------------------------------------------------")
  log("Deploying WMDBGovernor and waiting for confirmations...")
  const governorContract = await deploy("WMDBGovernor", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
    ],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: 1,
  })
  log(`GovernorContract at ${governorContract.address}`)
}

export default deployGovernorContract
deployGovernorContract.tags = ["all", "governor"]