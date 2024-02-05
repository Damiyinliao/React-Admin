import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Segmented } from 'antd';
import { useState } from 'react';

interface WebItem {
  label: string;
  value: string;
}

const Website: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState<boolean>(true);
  const [webUrl, setWebUrl] = useState<string>('https://cn.vuejs.org/');
  const [webList, setWebList] = useState<WebItem[]>([
    { label: 'Vue', value: 'https://cn.vuejs.org/' },
    { label: 'React', value: 'https://react.dev/learn/' },
    { label: 'Ant Design', value: 'https://ant-design.antgroup.com/components/button-cn' }
  ]);

  return (
    <div className="h-full w-full flex-column">
      <Segmented
        block
        className="mb-2"
        options={webList}
        onChange={(value) => {
          setLoading(true);
          setWebUrl(value as string);
        }}
      />
      <Spin indicator={antIcon} spinning={loading}></Spin>
      <iframe src={webUrl} className="flex-1 border-none" onLoad={() => setLoading(false)}></iframe>
    </div>
  );
};

export default Website;
