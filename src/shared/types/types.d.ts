import type { Mission, MissionDraft } from './mission';

declare global {
  interface Window {
    electronApi: {
      getMissions: () => Promise<Mission[]>;
      createMission: (m: MissionDraft) => Promise<true | false>;
      updateMission: (m: Mission) => Promise<true | false>;
      deleteMission: (mid: number) => Promise<true | false>;
    };
  }
}
