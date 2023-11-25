import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useState } from "react";

const Website: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="h-full w-full">
      <Spin
        indicator={antIcon}
        spinning={loading}
      >
        <iframe
          src="https://cn.vuejs.org/"
          style={{ width: '100%', height: 'calc(100vh - 120px)', border: 'none' }}
          onLoad={setLoading.bind(null, false)}
        ></iframe>
      </Spin>

    </div>
  )
}

export default Website;