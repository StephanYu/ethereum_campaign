const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Delete entire build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read Campaign.sol from contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// Compile both contracts
const output = solc.compile(source, 1).contracts;

// Create build directory if not yet existent
fs.ensureDirSync(buildPath);

// Write both contracts from output to build directory
for (let contract in output) {
  let contractName = contract.replace(':', '');
  
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    output[contract]
  );
}