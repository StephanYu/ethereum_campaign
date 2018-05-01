import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
// browser
web3 = new Web3(window.web3.currentProvider);
} else {
// server or user does not have metamask installed
const provider = new Web3.providers.HttpProvider(
  'https://rinkeby.infura.io/zFJJKQC9147CCsRhseih'
);
web3 = new Web3(provider);
}

export default web3;

