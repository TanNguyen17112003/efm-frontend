// DonutSlice.tsx
import React from 'react';
import { Path } from 'react-native-svg';
import { arc } from 'd3-shape';

const DONUT_SIZE = 180;
const activeArcLoader = arc()
  .innerRadius(65 - 2)
  .outerRadius(DONUT_SIZE / 2 + 2 * 2.5);
const arcLoader = arc()
  .outerRadius(DONUT_SIZE / 2)
  .innerRadius(65);
interface DonutSliceProps {
    isActive: boolean;
    color: string;
    arcData: any;
}
export const DonutSlice: React.FC<DonutSliceProps> = ({ isActive, color, arcData }) => {
    const [path, setPath] = React.useState<string | undefined>('');
    React.useEffect(() => {
        const newPath = isActive ? activeArcLoader(arcData) : arcLoader(arcData);
        if (newPath) {
            setPath(newPath);
        }
    }, [isActive, arcData]);
      return (
        <Path
          d={path}
          stroke={color}
          fill={color}
        />
    );
};
