'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0x009C95d6ee1098efe4C454874f23A809F2878Afd');

exports.default = factory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImZhY3RvcnkiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTRCLEFBQTVCOzs7Ozs7QUFFQSxJQUFNLFVBQVUsSUFBSSxjQUFLLEFBQUwsSUFBUyxBQUFiLFNBQ2QsS0FBSyxBQUFMLE1BQVcsMEJBQWdCLEFBQTNCLEFBRGMsWUFFZCxBQUZjLEFBQWhCLEFBS0E7O2tCQUFlLEFBQWYiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc3l1L2NvZGUvZXRoZXJldW0vZXRoZXJldW1fY2FtcGFpZ24ifQ==