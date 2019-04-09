import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;


function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    legend: {
      data: [{name:'高度(km)与气温(°C)变化关系',icon:"rect",textStyle:{color:"skyblue"}}]
    },
    tooltip: {
      trigger: 'axis',
      formatter: "Temperature : <br/>{b}km : {c}°C"
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    yAxis: {
      type: 'category',
      axisLine: { onZero: false },
      axisLabel: {
        formatter: '{value} km'
      },
      boundaryGap: false,
      data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
    },
    series: [
      {
        name: '高度(km)与气温(°C)变化关系',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      onInit:initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})