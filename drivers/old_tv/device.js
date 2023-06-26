'use strict';

const RFDevicePhilips = require('../../lib/RFDevicePhilips');

module.exports = class RFDevicePhilipsRC5 extends RFDevicePhilips {

  async onRFInit() {
    await super.onRFInit();

    const signal = await this.driver.getRFSignal();
    await signal.registerRXListener(async (commandId, { isFirst }) => {
      if (!isFirst) return;

      this.homey.flow
        .getDeviceTriggerCard(`${this.driver.id}:cmd_received`)
        .trigger(this, {}, {
          commandId,
        });
    });
  }
};
