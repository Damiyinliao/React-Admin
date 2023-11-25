import { Segmented } from "antd";
import { useIconStore } from "@/stores/icon"


const PickerPanel: React.FC = () => {

  const { panelTabKey, iconList, setPanelTabKey, setIcon } = useIconStore();

  const IconList: React.FC = () => {
    return (
      <div>
        <ul
          className="flex flex-wrap px-2 ml-2"
        >
          {
            iconList.map((item, index) => (
              <li
                className="iconfont"
                key={index}
                onClick={() => setIcon(item)}
              >{item}</li>
            ))
          }
        </ul>
      </div>
    )
  }

  return (
    <>
    <Segmented
      block
      value={panelTabKey}
      onChange={(key) => setPanelTabKey(key as string)}
      options={[
        { label: 'Ant Design', value: 'antd' },
        { label: 'Iconfont', value: 'iconfont' }
      ]}
    >
      <IconList />
    </Segmented>
    </>
  )
}

export default PickerPanel;