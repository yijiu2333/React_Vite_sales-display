import React from 'react';

export default function SalesRevenueTable({title = "2025 年预计销售与实际销售量数据对比", talbelabek = ["计划量","实际量","差异"], dataVolume = [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190], 
  dataActuall = [200, 220, 240, 260, 280, 300], trigger = true}) {
  // 模拟数据
  const diff = [];
  for (let i = 0; i < dataVolume.length; i++) {
    if (i < dataActuall.length) {
      diff.push(dataActuall[i] - dataVolume[i]);
    } else {
      diff.push('');
    }
  }

  const projects = [
    {
      name: talbelabek[0],
      monthlyData: dataVolume,
    },
    {
      name: talbelabek[1],
      monthlyData: dataActuall,
    },
    {
      name: talbelabek[2],
      monthlyData: diff,
    }
  ];

  const labels = ['','1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        <i className="fa fa-table text-warning mr-2"></i>
        {title}
      </h2>
      <div className="overflow-x-auto h-[27.5rem]">
        
        <table className="min-w-full divide-y divide-gray-200 h-[27.5rem]">
          <thead className="bg-gray-50/60">
            <tr>
              <th className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">项目</th>
              {labels.map((label, index) => (
                <th key={index} className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/30 divide-y divide-gray-200">
            
            {projects.map((project, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900" 
                       rowSpan={3}>
                      皮带轮
                    </td>
                  )}
                  <td className="px-6 py-6 whitespace-nowrap text-base font-bold text-gray-900">
                    {project.name}
                  </td>
                  {project.monthlyData.map((value, idx) => (
                    <td key={idx} className="px-6 py-6 whitespace-nowrap text-base font-medium text-gray-500">
                      {value === "" ? "" : (
                        project.name ===  talbelabek[2] && typeof value === 'number' && !isNaN(value) ? (
                          <>
                            {trigger ? value.toFixed(2) : value}
                            {value >= 0 ? (
                              <i className="fa fa-arrow-up text-success ml-1"></i>
                            ) : (
                              <i className="fa fa-arrow-down text-danger ml-1"></i>
                            )}
                          </>
                        ) : (typeof value === 'number' && !isNaN(value) && trigger ? value.toFixed(2) : value)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};