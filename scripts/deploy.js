const main = async () => {
  const homiesContractFactory = await hre.ethers.getContractFactory('happyHomies');
  const homiesContract = await homiesContractFactory.deploy();
  await homiesContract.deployed();
  console.log("Contract deployed to:", homiesContract.address);
 }
 
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
