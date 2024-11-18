import HeaderBackButton from "@/components/layout/HeaderBackButton";
import PageLayout from "@/components/layout/PageLayout";
import CodeForm from "./_components/CodeForm";

const Page = () => {
  return (
    <PageLayout header={{ title: "코드 찾아보기", left: <HeaderBackButton /> }} className="bg-v1-background">
        <CodeForm />
    </PageLayout>
  );
};

export default Page;
