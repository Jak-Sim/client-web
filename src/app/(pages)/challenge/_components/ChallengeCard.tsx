import Image from "next/image";
import challengeImage from "@/assets/images/placeholder/chat-list.png";

export default function ChallengeCard(){
  return <div className="h-[200px] bg-white rounded-2xl relative overflow-hidden">
    <Image src={challengeImage} alt="챌린지 이미지" fill className="object-cover" />
  
    <div className="absolute top-0 bottom-0 left-0 right-0 p-6">
      <div className="text-white">
        <h3 className="text-xl font-bold mb-1">챌린지 이름</h3>
        <p className="text-sm">챌린지 설명</p>
      </div>
    </div>
  </div>;
};
