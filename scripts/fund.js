const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("9000"),
    })
    await transactionResponse.wait(1)
    console.log("Funded!")
    const currentBalance = await fundMe.provider.getBalance(fundMe.address)
    console.log(currentBalance.toString())
    const deployerBalance = await fundMe.provider.getBalance(deployer)
    console.log(deployerBalance.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
