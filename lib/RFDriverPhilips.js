'use strict';

const { RFDriver } = require('homey-rfdriver');

module.exports = class extends RFDriver {

  async onRFInit() {
    await super.onRFInit();

    this.homey.flow
      .getDeviceTriggerCard(`${this.id}:cmd_received`)
      .registerRunListener(async (args, state) => {
        return args.cmd.cmd === state.commandId;
      })
      .getArgument('cmd')
      .registerAutocompleteListener(async query => {
        const signal = await this.getRFSignal();
        return Object.keys(signal.manifest.cmds)
          .map(commandId => ({
            name: this.homey.__(`commands.${commandId}`),
            cmd: commandId,
          }))
          .filter(command => {
            return command.name.toLowerCase().includes(query.toLowerCase());
          });
      });

    this.homey.flow
      .getActionCard(`${this.id}:send_cmd`)
      .registerRunListener(async ({ device, cmd }) => {
        return device.sendCommand({ commandId: cmd.cmd });
      })
      .getArgument('cmd')
      .registerAutocompleteListener(async query => {
        const signal = await this.getRFSignal();
        return Object.keys(signal.manifest.cmds)
          .map(commandId => {
            return {
              name: this.homey.__(`commands.${commandId}`) || commandId,
              cmd: commandId,
            };
          })
          .filter(command => {
            return command.name.toLowerCase().includes(query.toLowerCase());
          });
      });

    this.homey.flow
      .getActionCard(`${this.id}:send_cmd_number`)
      .registerRunListener(async ({ device, number }) => {
        return device.sendCommandNumber({ number });
      });
  }

};
