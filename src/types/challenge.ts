export interface Mission {
  id: number;
  name: string;
  description: string;
  reward: Reward;
  day: string[];
  time: { start: string; end: string } | null;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  remain: number;
  point: number;
  needConfirm: boolean;
}
