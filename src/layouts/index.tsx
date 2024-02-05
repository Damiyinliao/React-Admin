import { Suspense, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sider';
import Headerbar from './header';
import Loading from '@/components/Loading';

const { Footer, Content } = Layout;

const BasicLayout: React.FC = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/home');
  // }, []);

  return (
    <Layout className="layout h-full-screen">
      <Sidebar />
      <Layout>
        <Headerbar></Headerbar>
        <Content className="p-3">
          <section className="b-rd w-full h-full bg-light-50">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </section>
        </Content>
        <Footer className="text-center py-1 bg-light-50">
          <span>React-Admin</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
