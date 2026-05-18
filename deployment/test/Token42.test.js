// Mocha:   provides describe() to group tests and it() for individual test cases
// Chai:    provides expect() to assert values -> throws an error if assertion fails
// Hardhat: provides a local in-memory blockchain and ethers.js to interact with it

import { expect } from "chai";
import hre from "hardhat";

describe("Token42", function () {
    let token;
    let owner;
    let addr1;
    let addr2;
    let ethers;

    // fresh contract before each test
    beforeEach(async function () {
        ({ ethers } = await hre.network.getOrCreate());
        [owner, addr1, addr2] = await ethers.getSigners(); // 3 fake wallets
        const Token42 = await ethers.getContractFactory("Token42");
        token = await Token42.deploy();
        await token.waitForDeployment();
    });

    describe("Deployment", function () {
        it("should set the correct token name", async function () {
            expect(await token.name()).to.equal("Token42");
        });

        it("should set the correct symbol", async function () {
            expect(await token.symbol()).to.equal("TK42");
        });

        it("should set 18 decimals", async function () {
            expect(await token.decimals()).to.equal(18n);
        });

        it("should mint 1,000,000 TK42 to the deployer", async function () {
            // ethers.parseUnits() converts amounts to base units
            const expected = ethers.parseUnits("1000000", 18);
            expect(await token.totalSupply()).to.equal(expected);
            expect(await token.balanceOf(owner.address)).to.equal(expected);
        });

        it("should set the deployer as owner", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });
    });

    describe("Transfers", function () {
        it("should transfer tokens between accounts", async function () {
            const amount = ethers.parseUnits("100", 18);
            // token.connect(addr1) sends the next transaction from addr1 instead of owner
            await token.connect(owner).transfer(addr1.address, amount);
            expect(await token.balanceOf(addr1.address)).to.equal(amount);
        });

        it("should fail if sender has insufficient balance", async function () {
            const amount = ethers.parseUnits("1", 18);
            try {
                await token.connect(addr1).transfer(addr2.address, amount);
                expect.fail("should have reverted");
            } catch (e) {
                expect(e.message).to.include("BEP20: transfer amount exceeds balance");
            }
        });
    });

    describe("Allowances", function () {
        it("should approve and allow transferFrom", async function () {
            const amount = ethers.parseUnits("100", 18);
            await token.connect(owner).approve(addr1.address, amount);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
            expect(await token.balanceOf(addr2.address)).to.equal(amount);
        });

        it("should fail if transferFrom exceeds allowance", async function () {
            const amount = ethers.parseUnits("100", 18);
            try {
                await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
                expect.fail("should have reverted");
            } catch (e) {
                expect(e.message).to.include("BEP20: transfer amount exceeds allowance");
            }
        });
    });

    describe("Minting", function () {
        it("should allow owner to mint", async function () {
            const amount = ethers.parseUnits("500", 18);
            await token.connect(owner).mint(addr1.address, amount);
            expect(await token.balanceOf(addr1.address)).to.equal(amount);
        });

        it("should fail if non-owner tries to mint", async function () {
            const amount = ethers.parseUnits("500", 18);
            try {
                await token.connect(addr1).mint(addr1.address, amount);
                expect.fail("should have reverted");
            } catch (e) {
                expect(e.message).to.include("Ownable: caller is not the owner");
            }
        });
    });

    describe("Burning", function () {
        it("should allow anyone to burn their own tokens", async function () {
            const amount = ethers.parseUnits("100", 18);
            await token.connect(owner).transfer(addr1.address, amount);
            await token.connect(addr1).burn(amount);
            expect(await token.balanceOf(addr1.address)).to.equal(0n);
        });
    });

    describe("Ownership", function () {
        it("should transfer ownership", async function () {
            await token.connect(owner).transferOwnership(addr1.address);
            expect(await token.owner()).to.equal(addr1.address);
        });

        it("should fail if non-owner transfers ownership", async function () {
            try {
                await token.connect(addr1).transferOwnership(addr2.address);
                expect.fail("should have reverted");
            } catch (e) {
                expect(e.message).to.include("Ownable: caller is not the owner");
            }
        });
    });
});