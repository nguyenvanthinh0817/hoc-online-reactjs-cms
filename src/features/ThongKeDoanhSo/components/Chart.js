import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chart(props) {
  const { data, year } = props;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', //"light1", "dark1", "dark2"
    title: {
      text: `Biểu đồ biến đổi doanh số trong năm ${year}`,
    },
    axisY: {
      includeZero: true,
    },
    axisY: {
        title: "Việt Nam đồng",
        prefix: "đ"
    },
    axisX: {
        title: "Tháng",
        prefix: "Tháng "
    },
    data: [
      {
        type: 'area', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: months.map((item, index) => {
          return { x: item, y: data[index] };
        }),
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
}

export default Chart;
