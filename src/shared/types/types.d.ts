import type { Mission, MissionDraft } from './mission';
import type { ActiveRunState } from './focusRun';
import type { DecayDetails } from './focusStreak';
import type { StreakDay } from './streakDay';

declare global {
  interface Window {
    electronApi: {
      // MAIN WINDOW
      showTrafficLights: () => void;

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
      getTotalRunsCompletedToday: () => Promise<number | false>;
      getTotalMidRunPausesToday: () => Promise<number | false>;
      getTotalSecondsWorkedToday: () => Promise<number | false>;

      // FOCUS STREAK
      fillBarAndStartDecay: () => Promise<true | false>;
      stopDecay: () => Promise<true | false>;
      getDecayDetails: () => Promise<DecayDetails | false>;

      // STREAK DAY
      getCurrentStreakCount: () => Promise<number>;
      getLongestStreakCountInDateRange: (from: Date, to: Date) => Promise<number>;
      getStreakDaysInDateRange: (from: Date, to: Date) => Promise<StreakDay[]>;
      getTotalFocusRunsInDateRange: (from: Date, to: Date) => Promise<number>;
    };
  }
}
