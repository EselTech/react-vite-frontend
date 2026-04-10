import ReactECharts from 'echarts-for-react';

export function Dashboard() {
  const chartOptions = {
    color: ['#896D95', '#C8A0C0'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Categoria 1', 'Categoria 2'],
      right: 0,
      top: 0,
      icon: 'circle',
      textStyle: { color: '#999', fontSize: 12 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%', 
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        name: 'Categoria 1',
        type: 'bar',
        barGap: 0,
        data: [320, 332, 301, 334, 390, 330, 320],
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: 'Categoria 2',
        type: 'bar',
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-gray-800">

    <Sidebar/>

      {/*main content*/}
      <main className="w-4/5 h-full p-10 flex flex-col min-h-0">
        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-bold text-[#634C89] mb-1">Dashboard</h1>
          <p className="text-gray-400 m-0">Gerencie aqui todos os seus produtos</p>
        </header>

        {/*kpis*/}
        <section className="grid grid-cols-4 gap-5 mb-6 shrink-0">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 text-center shadow-sm">
              <p className="text-gray-400 text-sm mb-2">Indicador de Estoque</p>
              <h2 className="text-3xl font-bold text-[#896D95] m-0">XX</h2>
              <p className="text-green-500 text-xs mt-2 font-medium">▲ Aumento de X%</p>
            </div>
          ))}
        </section>

        {/*graficos*/}
        <section className="grid grid-cols-2 grid-rows-2 gap-6 flex-1 min-h-0">
          {[1, 2, 3, 4].map((chart) => (
            <div key={chart} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 shadow-sm relative flex flex-col min-h-0">
              <h3 className="text-gray-400 text-sm font-semibold absolute top-4 left-5 z-10">Gráfico {chart}</h3>
              
              <div className="relative w-full h-full mt-4 flex-1">
                <ReactECharts 
                  option={chartOptions} 
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', width: '100%' }} 
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

