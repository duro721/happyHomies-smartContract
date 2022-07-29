# Happy Homies smartContract
This repository will hold the smartContract i created for the Happy Homies NFT project that launched in march on the Ethereum Blockchain, it uses ERC721A. I am sharing this through Github so you can fork the repo and start playing around with building your own smartContract. Let me start of by saying i could never have reached this level if it was not for the NFT Community, i spend a lot of hours learning from others here are some links that helped me out:  
[Buildspace](https://buildspace.so)  
[Chance Gas Efficiancy](https://nftchance.medium.com/the-gas-efficient-way-of-building-and-launching-an-erc721-nft-project-for-2022-b3b1dac5f2e1)  
[LlammaWEB3 discord](https://discord.gg/mMSKjHHh3u)  
  
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
- We had 3 minting functions, 1 public and 2 presales. I would now investigate possibilities to have 1 presale mint function check how many a wallet is allowed to mint.
- Put some time into investigating Provenance Hash back then, not many people seemed to care in the end. But its still a good idea to show the legitimacy of your Art and store that hash in your contract. [Provenance Hash]([https://pages.github.com/](https://medium.com/coinmonks/the-elegance-of-the-nft-provenance-hash-solution-823b39f99473)
- Withdraw funds on the end of the contract is outdated and you should look into payment splitter

## merkleTree
In this directory you will finde the javascript to generate a merkleTree hash based on a list of Ethereum wallet addresses in .json. you can run it with node generateMerkleTree.js

## Scripts
Within this directory you will find 2 scripts, 1 is to run the contract localy and the other is to deploy the contract. I use Hardhat to work on my projects, please visit their site to find out more. [Hardhat](https://hardhat.org/)  

## Test
In this directory you will find the test file i used to test the contract and find out how much gas my minting functions would cost, i used Hardhat gas Reporter plugin for this and an API key to Coinmarketcap to get the correct Ethereum to USD price. Within the Hardhat config file you can set the ammount of accounts (wallets) used in testing. Its set to 6 at the moment but i also did testing with 8000, just to see how it performs with that many requests.
