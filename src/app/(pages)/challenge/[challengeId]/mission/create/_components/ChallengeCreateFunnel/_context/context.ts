import { TimeLike } from 'fs';
import { Days } from '@/utils/getKoreanDay';

export type MissionDescription = { name?: string; description?: string; pictures?: FileList | null };
export type MissionPeriod = {
  startDate?: Date | null;
  endDate?: Date | null;
  startTime?: TimeLike;
  endTime?: TimeLike;
  selectedDays?: Days[];
};
export type MissionPoint = { point?: number };

export type FunnelProps = {
  missionDescription: MissionDescription;
  missionPeriod: MissionPeriod;
  missionPoint: MissionPoint;
};
