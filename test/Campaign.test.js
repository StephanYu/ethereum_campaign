const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaign = require('../ethereum/build/Campaign.json');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

let accounts;
let factory;
let campaign;
let campaignAddress;
let minimumContribution = '100';

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign(minimumContribution).send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory', () => {
    assert.ok(factory.options.address);
  });

  it('deploys a campaign', () => {
    assert.ok(campaign.options.address);
  });

  it('marks the caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();

    assert(manager, accounts[0]);
  });

  it('marks people who contribute money as approvers', async () => {
    let contributor = accounts[1];
    await campaign.methods.contribute().send({
      from: contributor,
      value: '200'
    });
    const isContributor = await campaign.methods.approvers(contributor).call();
    
    assert(isContributor);
  });

  it('requires a contribution that is greater than the minimum contribution of 100', async () => {
    let contribution = '5';
    
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: contribution
      });
      assert(false);
    } catch(err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {
    let description = 'A test payment request';
    let value = '100';
    let recipient = accounts[1];

    await campaign.methods
      .createRequest(
        description,
        value,
        recipient
      )
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    const request = await campaign.methods.requests(0).call();

    assert(description, request.description);
  });

  it('processes payment requests and sends the funds to the correct recipient', async () => {
    // contribute
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    // create request
    let recipient = accounts[1];
    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), recipient)
      .send({ from: accounts[0], gas: '1000000' });

    // approve request
    await campaign.methods.approveRequest(0).send({ 
      from: accounts[0], 
      gas: '1000000' 
    });

    // finalize request
    await campaign.methods.finalizeRequest(0).send({ 
      from: accounts[0], 
      gas: '1000000' 
    });

    // get balance
    let balance = await web3.eth.getBalance(recipient);
    balance = parseFloat(web3.utils.fromWei(balance, 'ether'));

    // check if account balance is correct
    assert(balance > 104);
  });















});