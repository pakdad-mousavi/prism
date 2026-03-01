import { Utils } from '../utils.js';

export const validateSender = (frame: Electron.WebFrameMain | null) => {
  if (!frame) throw new Error('Missing sender');

  const url = new URL(frame.url);

  const isValid = Utils.isDev()
    ? url.host === 'localhost:5123'
    : url.protocol === 'file:';

  if (!isValid) {
    throw new Error('Forbidden IPC sender');
  }
};
