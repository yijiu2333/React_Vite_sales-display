import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function SalesRevenueChart({title = "2025 年预计销售量与实际销售量对比差异", revenueRatios = [-2.67, 6.55, -6.88, 5.10]}) {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
   
      // 自定义插件，用于在柱子下方显示数据
      const showDataOnBars = {
        id: 'showDataOnBars',
        afterDatasetsDraw(chart, args, options) {
          const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar, index) => {
              const value = dataset.data[index] + 100;
              const xPos = bar.x;
              const yPos = bar.base + 5;
              ctx.fillStyle = 'black';
              ctx.fillText(`${value.toFixed(2)}%`, xPos, yPos);
            });
          });
        }
      };
      
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [{
            label: '达成率(%)',
            data: revenueRatios,
            backgroundColor: revenueRatios.map(value => value >= 0 ? 'rgba(82, 54, 207, 0.7)' : 'rgba(250, 173, 20, 0.7)'),
            borderColor: revenueRatios.map(value => value >= 0 ? 'rgba(54, 207, 201, 0)' : 'rgba(250, 173, 20, 0)'),
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleColor: '#FFFFFF',
              bodyColor: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#8C8C8C'
              }
            },
            y: {
              beginAtZero: false,
              min: -20,
              max: 20,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                color: '#8C8C8C',
                callback: function(value) {
                  return (value + 100).toFixed(0) + '%';
                }
              },
              position: 'left'
            }
          }
        },
        plugins: [showDataOnBars]
      });
      
      // Store chart instance on ref for cleanup
      chartRef.current.chart = chart;

      return () => {
        if (chartRef.current?.chart) {
          chartRef.current.chart.destroy();
          chartRef.current.chart = null;
        }
      };
    }
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <i className="fa fa-bar-chart text-secondary mr-2"></i>
          {title}
        </h2>
      </div>
      <div className="h-[27.5rem]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};