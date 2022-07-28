const { utils } = require("ethers");

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('happyHomies');
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // Set Sale Active and mint 1 NFT
    let txn = await contract.setSaleActive(true);
    await txn.wait();
    const tokenNumber = 1
    let price = 0.03
    let totalPrice = (price * tokenNumber).toString();
    let tokenTxn = await contract.mintToken( tokenNumber, { value: ethers.utils.parseEther(totalPrice) });
    await tokenTxn.wait();
    console.log(`transaction hash: ${tokenTxn.hash}`);

    // Set preSaleActive
    /*let presaleTxn = await contract.setPreSaleActive(true);
    await presaleTxn.wait();*/

      // Reserve 98 NFTs for team
      /*let reservedTxn = await contract.mintReserved(98);
      await reservedTxn.wait();
      console.log("98 NFTs have been minted");*/

       // Get all token IDs of the owner
       const owner = await contract.owner();
       let tokens = await contract.balanceOf(owner)
       let totalTokens = (tokens).toString();
       console.log("Owner has tokens: ", totalTokens);
    
       // Get the total Supply
       tokenCount = await contract.totalSupply()
       let totalTokenCount = (tokenCount).toString();
       console.log("There is a tottaly supply of:", totalTokenCount)

       // get owner of token 0
       console.log("owner of 0 is:", contract.ownerOf(0));
       
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
