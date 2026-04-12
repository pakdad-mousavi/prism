export interface DecayDetails {
  barsFilled: number;
  decayTimeLeftMs: number | null;
  decayStage: 'idle' | 'multi' | 'final';
}

export type DECAY_DURATION_MS = 600_000; // 10 minutes
