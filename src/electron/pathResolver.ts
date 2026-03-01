import path from 'path';
import { app } from 'electron';
import { Utils } from './utils.js';

export const getPreloadPath = () => {
  return path.join(app.getAppPath(), Utils.isDev() ? '.' : '..', '/dist-electron/preload.cjs');
};
