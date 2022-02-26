const bidaVesting = artifacts.require("bidaVesting");
const BidAuction = artifacts.require("BidAuction");

contract('BIDA AUCTION CONTRACT DEPLOYMENT', function (accounts ) {

    const [ owner, user1, user2, user3 ] = accounts;

    const totalAmountToBeVestedInBNB = web3.utils.toWei('6700','ether');
    const totalUsedAmount = web3.utils.toWei('6700','ether');
    const totalExpectedBidaReward = web3.utils.toWei('25000000','ether');
    // const supposed = 25000000;
    const locked = web3.utils.toWei('1','ether');


    beforeEach(async function () {
        this.bidaToken = await BidAuction.new();
        
        this.vest = await bidaVesting.new(
            this.bidaToken.address
        );
        await this.bidaToken.transfer(this.vest.address, totalExpectedBidaReward, {from: owner});
    });
 
    describe("Vesting And Claiming Reward", function(){
        it('Vesting', async function(){
            await this.vest.lockFund({value: locked, from: user1} )
            const userData = await this.vest.userData(user1)
            console.log("User Balance before claiming after vesting")
            const userBalance = await  this.bidaToken.balanceOf(user1);
            console.log("User current balance before claim:", userBalance.toString())
            console.log("User expected rewards...................")
            // console.log()
            console.table([{
                'User Address': userData[0],
                'Amount Locked': userData[1].toString(),
                'Total Amount to recieve': userData[2].toString(),
                'Amount Claim': userData[3].toString(),
            }])
            const mu = totalExpectedBidaReward * 10**18;
            console.table([{
                'Deployment Amount': totalExpectedBidaReward.toString(),
                'Deployment Amount multiply by 10**18': mu.toString(),
            }])

            // await this.vest.enabledFirstFourPercent({from: owner} )
            // await this.vest.fourPercentClaim({from: user1} )
            const userBalanceA = await  this.bidaToken.balanceOf(user1);
            console.log("User current balance After claim:", userBalanceA.toString())
            const userData1 = await this.vest.userData(user1)

            console.table([{
                'user supposed reward': userBalanceA.toString(),
                'Total Amount to recieve': userData1[3].toString(),
            }])
            console.log("What user got....", )

        });
    });

})