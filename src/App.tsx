import { useEffect } from 'react';
import { useGlobalStore } from './stores/global';
import Router from './router';
import { ConfigProvider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useMenuStore } from './stores/menu';
import useRequest from './hooks/useRequest';
import appService from './api/app';
import { transformTree } from './utils/treeHelper';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {

  const { themeMode } = useGlobalStore();
  const { setMenuList, setIsSetMenu, setTreeMenuList, isSetMenu } = useMenuStore();
  const { runAsync: getMenus, loading } = useRequest(appService.getMenuAll, { manual: true })

  // 页面加载时获取菜单
  useEffect(() => {
    if (!isSetMenu) {
      getMenuList()
    }
  }, [])
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
  // 获取菜单数据
  const getMenuList = async () => {
    const [error, result] = await getMenus();
    if (error) {
      return
    };
    setMenuList(result.data);
    setTreeMenuList(transformTree(result.data, 'id', 'parentId'));
    setIsSetMenu(true);
  }

  return (
    <ConfigProvider componentSize='large'>
      <Spin indicator={antIcon} spinning={loading} tip="Loading">
        <Router />
      </Spin>
    </ConfigProvider>


  );
}

export default App;
