import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { IPieChartDataProps } from '../interfaces/interfaces';

function PieChart({ data }: IPieChartDataProps) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 60, left: 80 }}
      innerRadius={0.3}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLabel={(d) => `${d.value} $`}
      arcLinkLabelsSkipAngle={10}
      arcLabelsSkipAngle={10}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 70,
          translateY: 0,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#000',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
        },
      ]}
    />
  );
}

export default PieChart;
