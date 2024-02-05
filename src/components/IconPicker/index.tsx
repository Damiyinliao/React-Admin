import React, { useEffect } from 'react';
import { Flex as FlexBox, Button, Popover, Segmented, Input } from 'antd';
import { useIconStore } from '@/stores/icon';

const IconPicker: React.FC = () => {
  const { open, panelTabKey, iconList, setOpen, setPanelTabKey, setIcon } = useIconStore();
  const { Search } = Input;

  // 搜索图标
  function searchIcons(value: string) {}

  const IconGrid = (
    <ul className="flex flex-wrap h-[300px]" style={{ overflowY: 'auto' }}>
      {iconList.map((item) => (
        <li
          className="flex-center border-gray border-0.5 border-solid box-border cursor-pointer hover:bg-gray-100"
          style={{ flex: '0 0 20%', aspectRatio: '1/1' }}
          key={item.name}
          onClick={() => setIcon(item)}
        >
          {React.createElement(item.value)}
        </li>
      ))}
    </ul>
  );

  const content = (
    <FlexBox className="w-[300px]" gap="small" vertical>
      <Segmented
        block
        value={panelTabKey}
        onChange={(key) => setPanelTabKey(key)}
        options={[
          { label: 'Ant Design', value: 'antd' },
          { label: 'Iconfont', value: 'iconfont' }
        ]}
      />
      <Search
        placeholder="图标关键字"
        onSearch={(value: string) => {
          console.log(value);
        }}
        style={{ width: 300 }}
      />
      {IconGrid}
    </FlexBox>
  );

  return (
    <Popover
      content={content}
      title="图标选择器"
      trigger="click"
      placement="bottom"
      open={open}
      onOpenChange={(visible) => {
        setOpen(visible);
      }}
    >
      <Button>点击选择图标</Button>
    </Popover>
  );
};

export default IconPicker;
