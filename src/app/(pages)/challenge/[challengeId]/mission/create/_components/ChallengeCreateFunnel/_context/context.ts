import { TimeLike } from 'fs';


export type MissionDescription = { name?: string; description?: string; pictures?: FileList | null };
export type MissionPeriod = {
  startDate?: Date | null;
  endDate?: Date | null;
  startTime?: TimeLike;
  endTime?: TimeLike;
};
export type MissionPoint = { point?: number };

export type FunnelProps = {
  missionDescription: MissionDescription;
  missionPeriod: MissionPeriod;
  missionPoint: MissionPoint;
};