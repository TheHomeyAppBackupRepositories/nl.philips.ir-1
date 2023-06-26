'use strict';

const { RFSignal } = require('homey-rfdriver');

module.exports = class extends RFSignal {

  static FREQUENCY = 'ir';
  static ID = 'philips_rc6_prontohex';

};
