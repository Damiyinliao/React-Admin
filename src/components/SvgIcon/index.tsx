import { useMemo } from 'react';

interface SvgIconProps {
  prefix?: string;
  name: string;
  color?: string;
  size?: string | number;
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', name, color, size = 16 } = props;
  const symboldId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
  return (
    <svg aria-hidden="true" width={size} height={size} fill={color}>
      <use xlinkHref={symboldId} />
    </svg>
  );
};

export default SvgIcon;
