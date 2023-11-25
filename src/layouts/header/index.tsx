import { memo } from "react";
import { Layout } from "antd";
import { useGlobalStore } from "@/stores/global";
const { Header } = Layout;
import { IconSun, IconMoon } from "@/assets/icons";

const Headerbar: React.FC = () => {
  const { setThemeMode, themeMode } = useGlobalStore()
  return (
    <Header className='h-[80px] flex justify-between items-center'>
      <div className="left-head"></div>
      <div className="right-head">
        <div className="theme-mode flex items-center gap-4">
          <div
            className='btn-icon cursor-pointer text-[20px]'
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
          >
            { themeMode === 'light' ? <IconSun/> : <IconMoon/> }
          </div>
        </div>
      </div>
    </Header>
  )
}

export default memo(Headerbar);