const bidaVesting = artifacts.require("bidaVesting");
const BidAuction = artifacts.require("BidAuction");

  const totalAmountToBeVestedInBNB = web3.utils.toWei('6700','ether');
  const totalUsedAmount = web3.utils.toWei('6700','ether');

module.exports = async function (deployer, accounts) {
  await deployer.deploy(BidAuction)
  const bida = await BidAuction.deployed();
  await deployer.deploy(
      bidaVesting,
      bida.address
    );  
};