import * as echarts from 'echarts';
import { data } from './data';

const main = document.getElementById('main');
let myChart = echarts.init(main);

let months = new Set([]);
data.forEach((item) => months.add(item.period));

const dataIndex1 = [];
const dataIndex2 = [];
const dataIndex3 = [];
const dataIndex4 = [];

data.forEach((item) => {
  if (item.name === 'В программе ЦП') {
    dataIndex1.push(item.value);
  }
  if (item.name === 'В программе ИТ') {
    dataIndex2.push(item.value);
  }
  if (item.name === 'Вне программ ЦП') {
    dataIndex3.push(item.value);
  }
  if (item.name === 'Вне программ ИТ') {
    dataIndex4.push(item.value);
  }
});

const option = {
  title: {
    text: 'Проекты в программах и вне программ',
    subtext:
      'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
  },
  legend: { bottom: 'bottom' },
  toolbox: {
    iconStyle: {
      color: 'rgba(0, 57, 92, 0.8)',
      borderColor: 'rgba(255, 255, 255, 1)',
    },
    backgroundColor: 'rgba(0, 66, 105, 0.07)',
    show: true,
    feature: {
      dataView: { readOnly: false },
    },
    itemSize: 20,
    right: '6%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params) {
      const sumValueIn = params[0].value + params[1].value;
      const sumValueOutside = params[2].value + params[3].value;
      const percentageOne = (sumValueIn + sumValueOutside) / 100;
      const percentageOutside = Math.floor(sumValueOutside / percentageOne);
      const percentageIn = Math.ceil(sumValueIn / percentageOne);
      return `<b> ${params[0].name} <br/>
                 В программе:   ${percentageIn}% | ${sumValueIn}</b> <br/> 
                 <svg height="12" width="12">
                   <circle cx="6" cy="6" r="6"  stroke-width="3" fill="rgba(0, 120, 210, 1)" /></svg>
                 Проекты ИТ:    <b> ${params[1].value}шт</b> <br/>
                 <svg height="12" width="12">
                   <circle cx="6" cy="6" r="6"  stroke-width="3" fill="rgba(86, 185, 242, 1)" /></svg>
                 Проекты ЦП:   <b>  ${params[0].value}шт</b> <br/>
                <b> Вне программе:    ${percentageOutside}% | ${sumValueOutside}</b> <br/> 
                 <svg height="12" width="12">
                   <circle cx="6" cy="6" r="6"  stroke-width="3" fill="rgba(0, 114, 76, 1)" /></svg>
                 Проекты ИТ:    <b> ${params[3].value}шт</b> <br/>\
                  <svg height="12" width="12">
                   <circle cx="6" cy="6" r="6"  stroke-width="3" fill="rgba(34, 195, 142, 1)" /></svg>
                 Проекты ЦП:   <b>  ${params[2].value}шт</b> <br/>`;
    },
  },
  xAxis: {
    type: 'category',
    data: Array.from(months),
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: true,
      symbol: 'none',
    },
    axisTick: {
      show: true,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: 'В программе ЦП П.',
      type: 'bar',
      stack: 'one',
      data: dataIndex2,
      color: ['#56B9F2'],
    },
    {
      name: 'В программе ИТ П.',
      type: 'bar',
      stack: 'one',
      data: dataIndex1,
      label: {
        fontWeight: 'bold',
        show: true,
        position: 'top',
        formatter: function (params) {
          console.log(params);
          return params.data + dataIndex2[params.dataIndex];
        },
      },
      color: ['#0078D2'],
    },
    {
      name: 'Вне программ ЦП П.',
      type: 'bar',
      stack: 'two',
      data: dataIndex4,
      color: ['#22C38E'],
    },

    {
      name: 'Вне программ ИТ П.',
      type: 'bar',
      stack: 'two',
      data: dataIndex3,
      color: ['#00724C'],
      label: {
        fontWeight: 'bold',
        show: true,
        position: 'top',
        formatter: function (params) {
          console.log(params);
          return params.data + dataIndex4[params.dataIndex];
        },
      },
    },
  ],
};

myChart.setOption(option);
