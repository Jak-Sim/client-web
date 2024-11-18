import { Code, FilePlus } from "@/assets/images/icons";
import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";

export default function ChallengeLinkButtonBox(){
  return <div className="flex flex-col gap-3">
    {/* <Link href="/challenge/search">
    <ChallengeLinkButtonLayout icon={<SearchShiny />} title="챌린지 탐색" description="참여할 챌린지를 찾아볼까요?"/>
    </Link> */}
    <Link href="/challenge/code">
    <ChallengeLinkButtonLayout className="bg-white text-v1-primary" icon={<Code />} title="코드 참여하기" description="코드를 입력하고 바로 참여해 보세요!"/>
    </Link>
    <Link href="/challenge/create">
    <ChallengeLinkButtonLayout className="bg-white text-v1-text-primary-600 border-white" icon={<FilePlus />} title="만들기" description="새로운 챌린지를 만들어 봐요"/>
    </Link>
  </div>;
};

function ChallengeLinkButtonLayout({  className, icon, title, description }: { className?: string, icon: React.ReactNode, title: string, description: string }) {
  return <button className={cn("w-full py-5 pr-4 break-keep bg-v1-primary border-2 border-v1-primary text-white rounded-button text-left", className)} >
    <div className="flex">
      <div className="flex items-center justify-center w-16 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[28px] font-semibold leading-[32px] mb-1">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>

  </button>;
}
