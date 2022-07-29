# Happy Homies smartContract
This repository will hold the smartContract i created for the Happy Homies NFT project that launched in march on the Ethereum Blockchain, it uses ERC721A. I am sharing this through Github so you can fork the repo and start playing around with building your own smartContract.

## The smartContract
In the main directory you will finde happyHomies.sol, this is the smartContract used during the launch of Happy Homies. I will go over a few functions below and explain what they do so you can use it to create your own smartContract.  
  
For Happy Homies we used 2 Allowlists in order to reward people with 1 or 2 mints, with MerkleTree implementation we had a gas efficient way of adding big lists:
```
    bytes32 public presaleMerkleRoot;
    bytes32 public contestMerkleRoot;
```
  
This will map the address of someone who minted so you can set a maxium of mints per wallet:
```
mapping (address => uint256) public _tokensMintedByAddress;
````
  
### Some extra points of interest  
- I used Modifiers to do a check pre mint on mint functions to check if sale is active
- Withdraw funds on the end of the contract is outdated and you should look into payment splitter
