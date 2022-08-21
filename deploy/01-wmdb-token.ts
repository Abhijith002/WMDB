import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying WMDBToken and waiting for confirmations...")
  const governanceToken = await deploy("WMDBToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: 1,
  })

  
  log(`GovernanceToken at ${governanceToken.address}`)
  log(`Transferring to 0xCD19d747026275bEd2f40dcC7D3F4eE787af583e`)
  await transfer(governanceToken.address, "0xCD19d747026275bEd2f40dcC7D3F4eE787af583e")
  log(`Transferring to 0xE700fa58f02701AC7ee87C6a4A86777193970e4F`)
  await transfer(governanceToken.address, "0xE700fa58f02701AC7ee87C6a4A86777193970e4F")
  log(`Transferring to 0x67A0cc56Fe00106dd2ea8F603FCa2Fc3d289f2Bc`)
  await transfer(governanceToken.address, "0x67A0cc56Fe00106dd2ea8F603FCa2Fc3d289f2Bc")
  log(`Transferring to 0x8a5de0af965b95FE0D2141B78F783B5080cD575a`)
  await transfer(governanceToken.address, "0x8a5de0af965b95FE0D2141B78F783B5080cD575a")
  log(`Transferring to 0x90ea680E2E2380b9bdfF8487CC1f95a83a719DA3`)
  await transfer(governanceToken.address, "0x90ea680E2E2380b9bdfF8487CC1f95a83a719DA3")
  log("Transferred!")

  log(`GovernanceToken at ${governanceToken.address}`)
  log(`Delegating to 0xCD19d747026275bEd2f40dcC7D3F4eE787af583e`)
  await delegate(governanceToken.address, "0xCD19d747026275bEd2f40dcC7D3F4eE787af583e")
  log(`Delegating to 0xE700fa58f02701AC7ee87C6a4A86777193970e4F`)
  await delegate(governanceToken.address, "0xE700fa58f02701AC7ee87C6a4A86777193970e4F")
  log(`Delegating to 0x67A0cc56Fe00106dd2ea8F603FCa2Fc3d289f2Bc`)
  await delegate(governanceToken.address, "0x67A0cc56Fe00106dd2ea8F603FCa2Fc3d289f2Bc")
  log(`Delegating to 0x8a5de0af965b95FE0D2141B78F783B5080cD575a`)
  await delegate(governanceToken.address, "0x8a5de0af965b95FE0D2141B78F783B5080cD575a")
  log(`Delegating to 0x90ea680E2E2380b9bdfF8487CC1f95a83a719DA3`)
  await delegate(governanceToken.address, "0x90ea680E2E2380b9bdfF8487CC1f95a83a719DA3")
  log("Delegated!")

}

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("WMDBToken", governanceTokenAddress)
  const transactionResponse = await governanceToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

const transfer = async (governanceTokenAddress: string ,to: string) => {
  const governanceToken = await ethers.getContractAt("WMDBToken", governanceTokenAddress)
  const transactionResponse = await governanceToken.transfer(to, "50000000000000000000")
  await transactionResponse.wait(1)
  console.log(`Balance: ${await governanceToken.balanceOf(to)}`)
}

export default deployGovernanceToken
deployGovernanceToken.tags = ["all", "governor"]