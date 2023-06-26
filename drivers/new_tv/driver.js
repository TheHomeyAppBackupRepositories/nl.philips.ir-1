'use strict';

const RFDriverPhilips = require('../../lib/RFDriverPhilips');
const RFSignalPhilipsRC6 = require('../../lib/RFSignalPhilipsRC6');

module.exports = class RFDriverPhilipsRC6Prontohex extends RFDriverPhilips {

  static SIGNAL = RFSignalPhilipsRC6;

  async onRFInit() {

    await super.onRFInit();

    this.homey.flow.getActionCard('toggle')
      .registerRunListener(async (args, state) => {
        const signal = await this.getRFSignal();
        await signal.cmd('onoff');
      });
  }

};
