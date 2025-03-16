const {expect} = require("chai");
const{ethers} = require("hardhat");

describe("Lottery", function() {

    let lottery;
    let owner;
    let addr1;
    let addr2;

    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

    this.beforeEach(async function() {
        const Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();

        await lottery.deployed();

        [owner, addr1, addr2] = await ethers.getSigners(); 
    });


    describe("Deploy", function() {
        it("Should set the right initial balance", async function() {
            let initialBalance = await lottery.balanceOf(lottery.address);
            await expect(initialBalance).to.equal(10000);
        });

        it("Should deploy NFTs contract", async function() {
            await expect(lottery.nft()).not.to.be.equal(ZERO_ADDRESS);
        });
    });

    describe("Mint ERC20", function(){
        it("Should revert the mint, not the owner", async function(){
            await expect(lottery.connect(addr1).mint(1000)).to.be.revertedWith("Ownable: caller is not the owner");
        });
        
        it("Shouldn't revert the mint", async function(){
            await expect(lottery.mint(1000)).not.to.be.reverted;
            let balance = await lottery.balanceOf(lottery.address);
            await expect(balance).to.equal(10000+1000);
        });
    });


    describe("Buy tokens ERC20", function(){
        it("Should revert the transaction, not enough tokens", async function() {
            await expect(lottery.buyTokensERC20(10001)).to.be.revertedWith("Not enough tokens");
        });

        it("Should revert the transaction, not enough ethers", async function() {
            await expect(lottery.buyTokensERC20(5)).to.be.revertedWith("Not enough ethers");
        });

        it("Shouldn't revert the transaction", async function() {
            await expect(lottery.buyTokensERC20(6, {value: BigInt(7000000000000000000)})).not.to.be.reverted;
            expect(await lottery.balanceOf(owner.address)).to.equal(6);
            expect(await lottery.balanceOf(lottery.address)).to.equal(10000-6);
        });
    });

    describe("Users Info", function(){
        it("Shouldn't have any information", async function() {
            expect(await lottery.usersInfo(addr1.address)).to.equal(ZERO_ADDRESS);
        });

        it("Should have information", async function() {
            await lottery.connect(addr1).buyTokensERC20(6, {value: BigInt(700000000000000000)});
            expect(await lottery.usersInfo(addr1.address)).not.to.be.equal(ZERO_ADDRESS);
        });

    });

    describe("Buy Tickets", function(){
        it("Shouldn't can buy any tickets", async function() {
            await expect(lottery.buyTicket(2)).to.be.revertedWith("You dont have enough tokens");
            let tickets = await lottery.viewTickets(owner.address);

            await expect(tickets.length).to.equal(0);
        });

        it("Should can buy tickets", async function() {
            await lottery.connect(addr1).buyTokensERC20(6, {value: BigInt(7000000000000000000)})
            await expect(lottery.connect(addr1).buyTicket(2)).not.to.be.reverted;

            let tickets = await lottery.viewTickets(addr1.address);

            await expect(tickets.length).to.equal(2);
        });
    });

    describe("Generate winner", function(){
        it("Shouldn't generate winner, not the owner", async function(){
            await expect(lottery.connect(addr1).generateWinner()).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Shouldn't generate winner, no tickets bought", async function(){
            await expect(lottery.generateWinner()).to.be.revertedWith("No tickets bought");
        });

        it("Should generate winner", async function(){
            await lottery.connect(addr1).buyTokensERC20(6, {value: BigInt(7000000000000000000)})
            await lottery.connect(addr1).buyTicket(2);

            await lottery.connect(addr2).buyTokensERC20(6, {value: BigInt(7000000000000000000)})
            await lottery.connect(addr2).buyTicket(2);

            await expect(lottery.generateWinner()).not.to.be.reverted;

            let winner = await lottery.winnerAddress();

            await expect(winner).not.to.be.equal(ZERO_ADDRESS);

            let tickets = await lottery.viewTickets(winner);

            await expect(tickets.length).not.to.be.equal(0);
        });


    });


});