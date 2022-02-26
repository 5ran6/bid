const BidAuction = artifacts.require("BidAuction");

module.exports = function (deployer) {
  deployer.deploy(BidAuction);
};
