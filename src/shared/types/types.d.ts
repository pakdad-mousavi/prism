import type { Mission } from './mission';

declare global {
  interface Window {
    electronApi: {
      getMissions: () => Promise<Mission[]>;
      updateMission: (m: Mission) => Promise<true | false>;
    };
  }
}
