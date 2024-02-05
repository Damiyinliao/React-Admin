import { useEffect } from 'react';
import { useGlobalStore } from './stores/global';
import Router from '@/router';
import {
  ConfigProvider
  // Spin
} from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
// import useRequest from '@/hooks/useRequest';
// import appService from '@/api/app';

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const { themeMode } = useGlobalStore();
  //   const { setMenuList, setIsSetMenu, setTreeMenuList, isSetMenu } = useMenuStore();
  //   const { runAsync: getMenus, loading } = useRequest(appService.getMenuAll, { manual: true });
  // 切换主题
  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <ConfigProvider componentSize="large">
      {/* <Spin fullscreen indicator={antIcon} spinning={loading}> */}
      <Router />
      {/* </Spin> */}
    </ConfigProvider>
  );
}

export default App;
