// DonutChart.tsx
import React from 'react';
import { Text } from 'native-base';
import { Svg, G } from 'react-native-svg';
import { DonutSlice } from './DonutSlice';
import { pie, PieArcDatum } from 'd3-shape';


interface DonutChartProps {
    value: any;
    data: any[];
    size: number;
    pieSize: number;
    onItemSelected: (index: number) => void;
}

export const DonutChart: React.FC<DonutChartProps> = ({ value, data, size, pieSize, onItemSelected }) => {
  const [arcs, setArcs] = React.useState<PieArcDatum<number | { valueOf(): number; }>[]>([]);
  React.useEffect(() => {
    const pieGenerator = pie().value((item: any) => item.number);
    const calculatedArcs = pieGenerator(data);
    setArcs(calculatedArcs);
}, [data, pieSize]);
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G transform="translate(100, 100)">
            {data.map(({ color }, index) => (
              <DonutSlice
                key={`pie_shape_${index}`}
                color={color}
                arcData={arcs ? arcs[index] : null}
                isActive={value.index === index}
              />
            ))}
          </G>
        </Svg>
  );
};