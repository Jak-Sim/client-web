import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button/Button";
import successImage from "@/assets/images/logos/challenge-success.png";

const Page = ({searchParams}: {searchParams: {challengeId: string}}) => {
  const challengeId = searchParams.challengeId;

  return (
    <div className="h-full flex-1 flex flex-col justify-between p-6 bg-v1-background">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Image src={successImage} alt="챌린지 참여 완료" width={100} height={100} className="mb-2"/>
        <h1 className="text-[28px] text-v1-text-primary-700 font-semibold py-4">챌린지 참여 완료!</h1>
        <p className="text-xl text-v1-text-primary-400 leading-[24px]">
          챌린지의 목표와 
        보상을
          <br/>
          확인해 보세요
        </p>
      </div>
      {challengeId && (
        <Link href={`/challenge/${challengeId}`}>
          <Button variant="outline" >확인하러 가기</Button>
        </Link>
      )}
    </div>
  );
}

export default Page;
