const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing...")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Got it back!")
    const fundMeBalance = await fundMe.provider.getBalance(fundMe.address)
    console.log(fundMeBalance.toString())
    const deployerBalance = await fundMe.provider.getBalance(deployer)
    console.log(deployerBalance.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
