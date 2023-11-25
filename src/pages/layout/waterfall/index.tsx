import { useMemo, useRef, useState } from "react";


interface CardProps {
  imgUrl: string;
  title: string;
  style: React.CSSProperties;
  index: number;
  unitWidth: number; // 卡片宽度
  sizeChange: (index: number, height: number) => void;
  onClick: () => void;
}

const Card: React.FC<CardProps> = (props) => {

  const { imgUrl, title, style, index, unitWidth, sizeChange = () => {}, onClick } = props;
  const frameDom = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgInfo, setImgInfo] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const imgDom = useRef<HTMLImageElement>(null);

  /** 离父亲上边框的距离 */
  let topDistance = useMemo(() => {
    let y = style.transform ? Number(style.transform?.substring(style.transform.indexOf(',', 0) + 1, style.transform.length - 3)) : undefined;
    return y;
  }, [style]);


  const isShowImg = useMemo(() => {

  })
  return(
    <></>
  )
}


const WaterfallFlow: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl">欢迎使用 React-Admin</h1>
      </div>
    </>
  )
}
export default WaterfallFlow;