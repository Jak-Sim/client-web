import { api } from '@/lib/axios/axios';

export interface ChallengeCreateDTO {
  name: string;
  backgroundImage: string | null;
  isPublic: boolean;
  minParticipants: number;
  maxParticipants: number;
  tags: string[];
}

export interface ChallengeType {
  challengeId: number;
  name: string;
  backgroundImage: string;
  public: boolean;
  currentParticipants: number;
  maxParticipants: number;
  tags: string[];
  createdAt: string;
  creatorUserUuid: string;
  participants: string[] | null;
}
export type ChallengeListType = ChallengeType[];

class ChallengeClass {
  getChallengeList = async (page: number) => {
    const response = await api.get(`http://localhost:3001/challenge?page=${page}`);
    return response.data as ChallengeType[];
  };
  getChallenge = async (challengeId: number) => {
    const response = await api.get(`http://localhost:3001/challenge/${challengeId}`);
    return response.data as ChallengeType;
  };
  findChallengeByCode = async (code: string) => {
    const response = await api.get(`http://localhost:3001/challenge/find/${code}`);
    return response.data as ChallengeType;
  };
  createChallenge = async (challenge: ChallengeCreateDTO) => {
    const response = await api.post('/challenge/create', challenge);
    return response.data as ChallengeType;
  };
}

const Challenge = new ChallengeClass();
export { Challenge };
