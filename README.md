# Happy Homies smartContract
This repository will hold the smartContract i created for the Happy Homies NFT project that launched in march on the Ethereum Blockchain, it uses ERC721A. I am sharing this through Github so you can fork the repo and start playing around with building your own smartContract.

## The smartContract
In the main directory you will finde happyHomies.sol, this is the smartContract used during the launch of Happy Homies. I will go over a few functions below and explain what they do so you can use it to create your own smartContract.  
  
This function can be written to set one of the two sales active, default is false when you deploy the contract:
```
    bool public saleActive;
    bool public presaleActive;
```
  
This will map the address of someone who minted so you can set a maxium of mints per wallet:
```
mapping (address => uint256) public _tokensMintedByAddress;
````
  
### Some extra points of interest  
- I used Modifiers to do a check pre mint on mint functions to check if sale is active
- Withdraw funds on the end of the contract is outdated and you should look into payment splitter
