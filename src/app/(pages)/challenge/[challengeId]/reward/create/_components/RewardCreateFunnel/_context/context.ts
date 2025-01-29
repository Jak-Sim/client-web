export type RewardDescription = { name?: string; description?: string };
export type RewardPoint = { point?: number; count?: number };

export type FunnelProps = {
  rewardDescription: RewardDescription;
  rewardPoint: RewardPoint;
};
