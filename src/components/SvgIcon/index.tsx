import { useMemo } from 'react';

interface SvgIconProps {
  prefix?: string;
  name: string;
  color?: string;
  size?: string | number;
}

const SvgTcon: React.FC<SvgIconProps> = (props) => {
  const { prefix = 'icon', name, color, size = 16 } = props;
  const symboldId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
  return (
    <svg aria-hidden="true" width={size} height={size} fill={color}>
      <use xlinkHref={symboldId} />
    </svg>
  );
};

export default SvgTcon;