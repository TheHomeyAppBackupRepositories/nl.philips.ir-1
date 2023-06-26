'use strict';

const RFDevicePhilips = require('../../lib/RFDevicePhilips');

module.exports = class RFDevicePhilipsRC6Prontohex extends RFDevicePhilips {

  static RX_ENABLED = false;

  static CAPABILITIES = {
    onoff: 'onoff',
    volume_mute: 'mute',
    volume_up: 'volume_up',
    volume_down: 'volume_down',
    channel_up: 'channel_up',
    channel_down: 'channel_down',
  };

  async onCapability(capabilityId, value, opts = {}) {
    if (capabilityId === 'onoff') {
      let convertedCommand = capabilityId;
      const discreteSetting = this.getSettings().discrete_signals;

      if (discreteSetting) {
        convertedCommand = value ? 'power_on' : 'power_off';
      }

      const signal = await this.driver.getRFSignal();
      return signal.cmd(convertedCommand, { device: this });
    }

    return super.onCapability(capabilityId, value, opts);
  }

};
