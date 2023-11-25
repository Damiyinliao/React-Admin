import { useEffect, useState } from "react";
import NProgress from 'nprogress';

const Loading: React.FC = () => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    NProgress.start();
    setVisible(true);
    return () => {
      NProgress.done();
      setVisible(false);
    }
  }, [])

  if (!visible) {
    return null;
  }

  return (
    <div className="film-center">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  )
}

export default Loading;