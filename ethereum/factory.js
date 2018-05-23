import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xB6F66CaC92a5a53Cbcb1D0234D117348c00De6BB'
);

export default factory;
