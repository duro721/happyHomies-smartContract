# Happy Homies smartContract
This repository will hold the smartContract i created for the Happy Homies NFT project that launched in march on the Ethereum Blockchain, it uses [ERC721A](https://erc721a.org). I am sharing this through Github so you can fork the repo and start playing around with building your own smartContract. Let me start of by saying i could never have reached this level if it was not for the NFT Community, i spend a lot of hours learning from others here are some links that helped me out:  
  
[Buildspace](https://buildspace.so)  
[Chance Gas Efficiancy](https://nftchance.medium.com/the-gas-efficient-way-of-building-and-launching-an-erc721-nft-project-for-2022-b3b1dac5f2e1)  
[LlammaWEB3 discord](https://discord.gg/mMSKjHHh3u)  
  
## The smartContract
In the main directory you will finde happyHomies.sol, this is the smartContract used during the launch of Happy Homies. I will go over a few functions below and explain what they do so you can use it to create your own smartContract.  
  
Below some numbers, a maxium supply, price for a NFT and 3 settings for a maximum mint for their respective minting functons:  
_Only 1 of them can't be changed after contract is deployed, and that is MAX_SUPPLY_
```
    uint256 constant MAX_SUPPLY = 10000;
    uint256 public price = 0.06 ether;
    uint256 public maxMint = 2; 
    uint256 public maxPresaleMint = 1; 
    uint256 public maxContestMint = 2;
```
    
Two function to set a sale active, sale (for public) and presale for Whitelist mint:  
```
    bool public saleActive;
    bool public presaleActive;
```
  
For Happy Homies we used 2 Allowlists in order to reward people with 1 or 2 mints, with MerkleTree implementation we had a gas efficient way of adding big lists:
```
    bytes32 public presaleMerkleRoot;
    bytes32 public contestMerkleRoot;
```

One is the baseURI for setting the IPFS hash that leads to the metadata (ifps:/hsx2134hasd/) the other to set the Provenance hash:
```
    string public _baseTokenURI;
    string public homiesProvenance;
```
  
This will map the address of someone who minted so you can set a maxium of mints per wallet:
```
mapping (address => uint256) public _tokensMintedByAddress;
````

Used to set the merkleRoot hash for the respective minting functions:
```
    bytes32 public presaleMerkleRoot;
    bytes32 public contestMerkleRoot;
```

### The Minting Functions

#### Public Mint
The function requires a quantity set when using it and its payable meaning it accepts ETH, it also checks the modifier to see if sale is active and it sets nonReentrant which safegaurds against a contract minting. In newer versions of ERC721A the _safeMint version is already safegaurded against contract minting, so you no longer need it. After the initial function check it will go through the requirements.
1. It checks if you are not minting more than allowed (maxMint)
2. It checks if you are sending the correct amount of ETH
3. It checks if you are not minting more than the maximum supply (MAX_SUPPLY)
  
At the end it calls the _safeMint function and mints the quantity set through the frontend mintpage

```
    function mintToken(uint256 quantity) external payable onlySaleActive nonReentrant() {
        require(quantity <= maxMint, "You can not mint more than alowed");
        require(price * quantity == msg.value, "Wrong amout of ETH sent");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Can not mint more than max supply");

           _safeMint( msg.sender, quantity);
    } 
```

#### Presale Minting
This function was used for our Whitelist presale for wallets that acquired 1 mint, besides the quantity you also have to hand over proof that the wallet your using is on the whitelist (MmrkleTree). And it checks the modifer to see if presale is active. Afther this it will go through the following requirements.
1. It checks the merkleProof you provide through the frontend when you click mint
2. It checks if your sending the correct ammount of ETH
3. It checks if how many you already minted and it has to be lower than the maximum of 1
4. It checks if you are not minting more than the maxium supply (MAX_SUPPLY)

It will then mint the NFT and it will map the quantity to your address, so if you try to mint again check 3 will fail and you can not mint more.

```
    function mintPresale(uint256 quantity, bytes32[] calldata proof) external payable onlyPresaleActive nonReentrant() {
        require(MerkleProof.verify(proof, presaleMerkleRoot, keccak256(abi.encodePacked(msg.sender))), "Address is not on Presale Allow List");
        require(price * quantity == msg.value, "Wrong amout of ETH sent");
        require(_tokensMintedByAddress[msg.sender] + quantity == maxPresaleMint, "Can only mint 1 token during PreSale");
        require(totalSupply() + quantity < MAX_SUPPLY, "Can not mint more than max supply");

        _tokensMintedByAddress[msg.sender] += quantity;
         _safeMint(msg.sender, quantity);
    }
```

#### Presale Contest Minting
This function is basically the same as the one above except that you can mint 2 tokens instead of 1, this feels outdated and i'm sure there are better ways out there to merge this into 1 minting function. But back in the day this is how i got it to work :).
```
    function mintContest(uint256 quantity, bytes32[] calldata proof) external payable onlyPresaleActive nonReentrant() {
        require(MerkleProof.verify(proof, contestMerkleRoot, keccak256(abi.encodePacked(msg.sender))), "Address is not on Contest Allow List");
        require(price * quantity == msg.value, "Wrong amout of ETH sent");
        require(_tokensMintedByAddress[msg.sender] + quantity <= maxContestMint, "Can only mint 2 tokens during PreSale");
        require(totalSupply() + quantity < MAX_SUPPLY, "Can not mint more than max supply");

        _tokensMintedByAddress[msg.sender] += quantity;
         _safeMint(msg.sender, quantity);
    }
```

### Some extra points of interest  
- I used Modifiers to do a check pre mint on mint functions to check if sale is active
- We had 3 minting functions, 1 public and 2 presales. I would now investigate possibilities to have 1 presale mint function check how many a wallet is allowed to mint.
- Put some time into investigating Provenance Hash back then, not many people seemed to care in the end. But its still a good idea to show the legitimacy of your Art and store that hash in your contract. [Provenance Hash](https://medium.com/coinmonks/the-elegance-of-the-nft-provenance-hash-solution-823b39f99473)
- Withdraw funds on the end of the contract is outdated and you should look into payment splitter

## merkleTree
In this directory you will finde the javascript to generate a merkleTree hash based on a list of Ethereum wallet addresses in .json. you can run it with ```node generateMerkleTree.js```

## Scripts
Within this directory you will find 2 scripts, 1 is to run the contract localy and the other is to deploy the contract. I use Hardhat to work on my projects, please visit their site to find out more. [Hardhat](https://hardhat.org/)  

## Test
In this directory you will find the test file i used to test the contract and find out how much gas my minting functions would cost, i used Hardhat gas Reporter plugin for this and an API key to Coinmarketcap to get the correct Ethereum to USD price. Within the Hardhat config file you can set the ammount of accounts (wallets) used in testing.
