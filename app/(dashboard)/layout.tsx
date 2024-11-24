import { auth } from "@/auth";
import Container from "../ui/Container/Container";
import UserProfileSidebar from "../ui/UserProfileSidebar/UserProfileSidebar";
import { API_BASE_URL } from "../config/api";

async function getDashboard(id: any): Promise<any> {

  const response = await fetch(`${API_BASE_URL}/customers_dashboard/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const result = await getDashboard(session?.user?.id);


  return <Container>
    <div className="flex flex-col lg:flex-row gap-4 items-start py-[10px] md:py-[70px] flex-wrap ">
      <div className=" w-full lg:w-[250px] h-full ">
        <UserProfileSidebar customer={result} session={session} />
      </div>
      <div className="content  flex-1 w-full ">
        {children}
      </div>

    </div>
  </Container>
}