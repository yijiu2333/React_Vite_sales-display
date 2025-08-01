import React from 'react';
import SalesRevenueTable from './SalesRevenueTable';
import SalesRevenueChart from './SalesRevenueChart';
// import { Card } from 'antd';

export default function MainSection() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <SalesRevenueChart 
            title = {"2025 年预计销售量与实际销售量对比差异"}
            revenueRatios = {[-5, 10, 1.5, 2.75]}
          />
        </div>
        <div className="col-span-2">
          <SalesRevenueTable 
            title='2025 年预计销售与实际销售量数据对比'
            talbelabek = {["计划量","实际量","差异"]}
            dataVolume = {[158,109,161,133,178,151,158,185,149,169,173,177]}
            dataActuall = {[143,115,162,134]}
            trigger = {false}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <SalesRevenueChart 
            title = {"2025 年预计销售收入与实际销售收入对比差异"}
            revenueRatios = {[-2.5, 7, -9.73, 10.87]}
          />
        </div>
        <div className="col-span-2">
          <SalesRevenueTable 
            title='2025 年预计销售与实际销售收入数据对比'
            talbelabek = {["计划收入","实际收入","差值"]}
            dataVolume = {[1575.00,1157.18,1746.13,1414.46,1879.60,1686.70,1729.54,1991.68,1727.25,1823.65,1739.62,1946.07]}
            dataActuall = {[1533.00,1233.00,1626.00,1486.61]}
          />
        </div>
      </div>
    </div>
  );
}
