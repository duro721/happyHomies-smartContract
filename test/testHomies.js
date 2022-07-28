const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const { utils } = require("ethers");

describe("happyHomies", function(){

let Homies;
let hardhatHomies;
let owner;

// deploys the contract //
beforeEach(async function () {
  
        [owner, addr1,addr2,addr3,addr4,addr5,addr6] = await ethers.getSigners();
        Homies = await ethers.getContractFactory("homiesTest");
        hardhatHomies = await Homies.deploy();
      });

// shows the owner of the contract //      
describe("Deployment", function () {
  it("Should show the right owner", async function () {
      expect(await hardhatHomies.owner()).to.equal(owner.address);
      console.log("contract owner:", owner.address)
    });
  });


// Mints multiple tokens //  
describe("Mint multiple tokens from different addresses", function (){
  it("Should mint multiple times and have a total supply of 24", async () => {
      await hardhatHomies.setSaleActive(true);
      await hardhatHomies.setBaseURI("ipfs://bafybeiadh6zpff54mhyhc3aprn6dkw7x3bs6fmod7yvjbmyjle56hlpyyi/");
      const tokenNumber1 = 1
      const tokenNumber2 = 2
      let price = 0.05
      let totalPrice1 = (price * tokenNumber1).toString();
      let totalPrice2 = (price * tokenNumber2).toString();

      
      var addrArray = [addr1, addr2,addr3,addr4,addr5,addr6]
      var arrayLength = addrArray.length;
      for (var i = 0; i < arrayLength; i++) {
         await hardhatHomies.connect(addrArray[i]).mintToken( tokenNumber1, { value: ethers.utils.parseEther(totalPrice1) });
      }

      var arrayLength = addrArray.length;
      for (var i = 0; i < arrayLength; i++) {
         await hardhatHomies.connect(addrArray[i]).mintToken( tokenNumber2, { value: ethers.utils.parseEther(totalPrice2) });
      }

      var arrayLength = addrArray.length;
      for (var i = 0; i < arrayLength; i++) {
         await hardhatHomies.connect(addrArray[i]).mintToken( tokenNumber1, { value: ethers.utils.parseEther(totalPrice1) });
      }


      // await hardhatHomies.withdrawAll()

      let tokens = await hardhatHomies.balanceOf(addr2.address)
      let totalTokens = (tokens).toString();

      let getSupply = await hardhatHomies.totalSupply();
      let supply = (getSupply).toString();
      console.log("total Supply is:", supply)
      console.log("addr2 has this many tokens:", totalTokens)
      assert.equal(supply, 24)
    });
  });
});
