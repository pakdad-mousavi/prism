import type { Mission } from './mission';

declare global {
  interface Window {
    electronApi: {
      getMissions: () => Promise<Mission[]>;
    };
  }
}
