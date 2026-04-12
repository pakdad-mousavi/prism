import type { Mission, MissionDraft } from './mission';
import type { ActiveRunState } from './focusRun';
import type { DecayDetails } from './focusStreak';

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

      // FOCUS RUNS
      startRun: (runId: number | null) => Promise<true | false>;
      pauseRun: () => Promise<true | false>;
      resumeRun: () => Promise<true | false>;
      finishRun: () => Promise<true | false>;
      abandonRun: () => Promise<true | false>;
      getActiveRunState: () => Promise<ActiveRunState | null | false>;
      
      // FOCUS STREAK
      fillBarAndStartDecay: () => Promise<true | false>;
      stopDecay: () => Promise<true | false>;
      getDecayDetails: () => Promise<DecayDetails | false>;
    };
  }
}
