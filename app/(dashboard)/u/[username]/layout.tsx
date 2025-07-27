import { getSelfByUsername } from "@/lib/services/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface QuestCommandLayoutProps {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}

const QuestCommandLayout = async ({
  params,
  children,
}: QuestCommandLayoutProps) => {
  const { username } = await params;

  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default QuestCommandLayout;
