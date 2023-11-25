import { useGlobalStore } from "@/stores/global";
import { Layout } from "antd";
import Menus from "./menus";
import Logo from "./logo";
const { Sider } = Layout;

const Sidebar: React.FC = () => {

  const { collapsed, setCollapsed } = useGlobalStore()
  return (
    <Sider
      className='bg-primary color-transition pt-4'
      width='280'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Logo />
      <Menus />
    </Sider>
  )
}

export default Sidebar;