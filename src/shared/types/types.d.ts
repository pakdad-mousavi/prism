import type { Mission, MissionDraft } from './mission';

declare global {
  interface Window {
    electronApi: {
      // MISSIONS
      getMissions: () => Promise<Mission[] | false>;
      createMission: (m: MissionDraft) => Promise<true | false>;
      updateMission: (m: Mission) => Promise<true | false>;
      deleteMission: (mid: number) => Promise<true | false>;

      // ACTIVE MISSIONS
      getActiveMissionId: () => Promise<number | false>;
      setActiveMissionId: (id: number | null) => Promise<true | false>;
    };
  }
}
