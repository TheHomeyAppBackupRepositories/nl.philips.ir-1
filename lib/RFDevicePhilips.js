'use strict';

const { RFDevice } = require('homey-rfdriver');

module.exports = class RFDevicePhilips extends RFDevice {
  static RX_ENABLED = true;
  static CAPABILITIES = {
    onoff: {
      true: 'power_on',
      false: 'power_off',
    },
    volume_mute: 'mute',
    volume_up: 'volume_up',
    volume_down: 'volume_down',
    channel_up: 'channel_up',
    channel_down: 'channel_down',
  };

  async sendCommand({ commandId }) {
    const signal = await this.driver.getRFSignal();
    await signal.cmd(commandId);
  }

  async sendCommandNumber({ number }) {
    const signal = await this.driver.getRFSignal();
    const numbers = String(number).split('');

    for (const number of numbers) {
      await signal.cmd(`number_${number}`);
      await new Promise(resolve => setTimeout(resolve, 450));
    }
  }

};
