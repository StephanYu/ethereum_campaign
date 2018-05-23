const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
  'satoshi rely recycle stamp smart soap modify vast effort piece vendor pulse',
  'https://rinkeby.infura.io/zFJJKQC9147CCsRhseih'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  console.log('Starting deployment from account', account);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: account });
  
  console.log('Contract succesfully deployed to', result.options.address);
};

deploy();
