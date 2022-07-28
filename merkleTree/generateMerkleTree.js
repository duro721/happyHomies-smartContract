const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const generateWhitelistRoot = () => {
  const whitelistAddr = require('./mintaddresses.json')
  const whitelistLeafNodes = whitelistAddr.map((addr) => keccak256(addr));
  const whitelistMerkleTree = new MerkleTree(whitelistLeafNodes, keccak256, { sortPairs: true });
  const whitelistRootHash = whitelistMerkleTree.getHexRoot();

  console.log('whitelistRootHash', whitelistRootHash);
  return whitelistRootHash;
};

module.exports = { generateWhitelistRoot };
generateWhitelistRoot()
