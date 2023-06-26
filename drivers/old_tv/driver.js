'use strict';

const RFDriverPhilips = require('../../lib/RFDriverPhilips');
const RFSignalPhilipsRC5 = require('../../lib/RFSignalPhilipsRC5');

module.exports = class RFDriverPhilipsRC5 extends RFDriverPhilips {

  static SIGNAL = RFSignalPhilipsRC5;

};
