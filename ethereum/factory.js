import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x009C95d6ee1098efe4C454874f23A809F2878Afd'
);

export default factory;
