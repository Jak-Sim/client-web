'use client';

import { Mission, Reward } from '@/types/challenge';
import MissionItem from '../../_components/MissionItem';
import RewardItem from '../../_components/RewardItem';
import { type TabType } from '../page';
import NewMission from './NewMission';
import NewReward from './NewReward';

export default function ChallengeContents({
  challengeId,
  tab,
  rewards,
  missions,
}: {
  challengeId: string;
  tab: TabType;
  rewards: Reward[];
  missions: Mission[];
}) {
  return (
    <>
      {tab === 'mission-ongoing' && (
        <ListWrapper>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} hasFavorite={true} />
          ))}
          <NewMission challengeId={challengeId} />
        </ListWrapper>
      )}
      {tab === 'reward-page' && (
        <ListWrapper>
          {rewards.map((reward) => (
            <RewardItem key={reward.id} reward={reward} hasFavorite={true} />
          ))}
          <NewReward challengeId={challengeId} />
        </ListWrapper>
      )}
      {tab === 'mission-complete' && (
        <ListWrapper>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} hasFavorite={true} isFinished={true} />
          ))}
        </ListWrapper>
      )}
    </>
  );
}

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ul className='flex flex-col gap-4 pt-4'>{children}</ul>;
};
