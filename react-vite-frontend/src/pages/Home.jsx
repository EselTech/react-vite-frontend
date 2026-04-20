import ReactECharts from "echarts-for-react";

export function Home() {
  const chartOptions = {
    color: ["#896D95", "#C8A0C0"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["Categoria 1", "Categoria 2"],
      right: 0,
      top: 0,
      icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E", "F", "G"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999" },
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        name: "Categoria 1",
        type: "bar",
        barGap: 0,
        data: [320, 332, 301, 334, 390, 330, 320],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "Categoria 2",
        type: "bar",
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  const kpis = [
    { title: "RECEITA", value: "1.284" },
    { title: "DESPESA", value: "1.284" },
    { title: "RESULTADO", value: "1.284" },
    { title: "MARGEM", value: "1.284" },
    { title: "A RECEBER", value: "1.284" },
    { title: "A PAGAR", value: "1.284" },
  ];

  return (
    <main className="flex-1 h-full p-6 flex flex-col bg-white font-sans text-gray-800 overflow-hidden">
      
      <header className="mb-6 shrink-0">
        <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">
          Bem-vinda de volta, Cibelle!
        </h1>
        <p className="text-gray-400 m-0">
          Aqui está um resumo do seu ateliê hoje — segunda-feira, 30 de março de 2026
        </p>
      </header>

      {/*kpi e alertas*/}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-4 shrink-0">
        
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <div key={index} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-4 shadow-sm flex flex-col justify-center">
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">
                {kpi.title}
              </p>
              <h2 className="text-4xl font-bold text-[#896D95] m-0 mb-2">
                {kpi.value}
              </h2>
              <div>
                <span className="inline-block bg-[#E5F5E9] text-[#4CAF50] text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                  + 12 esta semana
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-[#332A47] mb-4">Alertas</h2>
          
          <ul className="flex flex-col gap-3 flex-1 overflow-hidden">
            <li className="flex items-start border-b border-[#EFEFEF] pb-3 last:border-0 last:pb-0">
              <div className="w-2 h-2 rounded-full bg-[#FF8A65] mt-1.5 mr-3 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs md:text-sm text-gray-600 font-medium leading-tight pr-2">
                    Caneta personalizada com estoque crítico (5 un.)
                  </p>
                  <button className="text-xs text-[#896D95] hover:underline font-medium shrink-0">
                    Ver
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">agora</span>
              </div>
            </li>

            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#FFCA28] mt-1.5 mr-3 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs md:text-sm text-gray-600 font-medium leading-tight pr-2">
                    Agenda com apenas 12 unidades restantes
                  </p>
                  <button className="text-xs text-[#896D95] hover:underline font-medium shrink-0">
                    Ver
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">há 3 horas</span>
              </div>
            </li>
          </ul>
        </div>

      </section>

      {/*graficos*/}
     <section className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-70">
        {[1, 2].map((chart) => (
          <div key={chart} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Gráfico {chart}</h3>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ReactECharts 
                option={chartOptions} 
                style={{ height: '100%', width: '100%' }} 
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}