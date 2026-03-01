import { Utils } from '../utils.js';

export const validateSender = (frame: Electron.WebFrameMain | null) => {
  if (!frame) return false;

  const url = new URL(frame.url);

  if (Utils.isDev()) {
    return url.host === 'localhost:5123';
  }

  return url.protocol === 'file:' && url.pathname.endsWith('/dist-vue/index.html');
};
