
import LoginForm from '@/app/ui/login-form';
import Container from '@/app/ui/Container/Container';
import { Metadata } from 'next';
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
export const metadata: Metadata = {
  title: 'Register | Account',
  description: 'Register | Account',
}

async function getLoginData() {
  try {
    const response = await fetch(`${API_BASE_URL}/setting_info_data`);
    if (!response.ok) {
      return {};
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: any = await response.json();
      return data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export default async function LoginPage() {
  const translate = await getLoginData();
  // const cookieStore = cookies();
  // const exist = cookieStore.has('auth');
  // const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;

  return (
    <main className="pt-10 pb-10" style={{
      backgroundImage: `url("${BASE_URL}/public/${translate?.data[0]?.login_img}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      background: "radial-gradient(circle, rgba(101,124,189,1) 0%, rgba(142,37,129,1) 100%)",
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} >
      <Container>
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 lg:w-[630px] ">
          {/* <div className='mb-10'>

            <div className="flex items-center justify-center ">
              <img src={`${BASE_URL}/public/${translate?.store_data_logo[0]?.login_page_logo}`} alt="" />
            </div>
          </div> */}
          <div className='grid grig-cols-1  w-full  ' >
            <LoginForm reg={true} translate={translate} />
          </div>
        </div>
      </Container>
    </main>
  );
}