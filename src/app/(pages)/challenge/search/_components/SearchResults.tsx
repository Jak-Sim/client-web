import { useSearchParams } from 'next/navigation';
import LinkTabs from '@/components/tab/LinkTabs';
import ChallengeCard from '../../_components/ChallengeCard';
import MissionItem from '../../_components/MissionItem';
import RewardItem from '../../_components/RewardItem';
import { TEMP_SEARCH_RESULT, useSearch } from '../_hook/useSearch';
import HorizontalScrollList from './HorizontalScrollList';
import SectionHeader from './SectionHeader';
import UserItem from './UserItem';

const DUMMY_USER_ID = '75ab190b-6998-41c5-98d2-ea70df102264';
const TABS = [
  { type: 'all', label: '전체', href: '?tab=all' },
  { type: 'user', label: '대화상대', href: '?tab=user' },
  { type: 'challenge', label: '챌린지', href: '?tab=challenge' },
  { type: 'mission', label: '미션', href: '?tab=mission' },
  { type: 'reward', label: '리워드(보상)', href: '?tab=reward' },
];
export type TabType = (typeof TABS)[number]['type'];

interface SearchResultsProps {
  searchResult: ReturnType<typeof useSearch<typeof TEMP_SEARCH_RESULT>>['searchResult'];
}

export default function SearchResults({ searchResult }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'all';
  const isAll = tab === 'all';

  return (
    <>
      <LinkTabs tab={tab} tabs={TABS} className={!isAll ? 'mb-4' : ''} />
      {isAll && <SectionHeader title='대화 상대' tab='user' />}
      {isAll || tab === 'user' ? (
        <HorizontalScrollList>
          {searchResult.result?.users.map((user) => <UserItem user={user} key={user.id} />)}
        </HorizontalScrollList>
      ) : null}

      {isAll && <SectionHeader title='챌린지' tab='challenge' />}
      {isAll || tab === 'challenge' ? (
        <HorizontalScrollList>
          {searchResult.result?.challenges.map((challenge) => (
            <ChallengeCard key={challenge.challengeId} challenge={challenge} userId={DUMMY_USER_ID} />
          ))}
        </HorizontalScrollList>
      ) : null}

      {isAll && <SectionHeader title='미션' tab='mission' />}
      {isAll || tab === 'mission' ? (
        <HorizontalScrollList>
          {searchResult.result?.missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} hasFavorite={true} />
          ))}
        </HorizontalScrollList>
      ) : null}

      {isAll && <SectionHeader title='리워드(보상)' tab='reward' />}
      {isAll || tab === 'reward' ? (
        <HorizontalScrollList>
          {searchResult.result?.rewards.map((reward) => (
            <RewardItem key={reward.id} reward={reward} hasFavorite={true} />
          ))}
        </HorizontalScrollList>
      ) : null}
    </>
  );
}
