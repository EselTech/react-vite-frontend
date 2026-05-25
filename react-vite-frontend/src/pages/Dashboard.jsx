import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

export function Dashboard() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const EMPRESA_ID = 1;

  function carregarDashboard() {
    setCarregando(true);
    api
      .get("/dashboard", { params: { empresaId: EMPRESA_ID } })
      .then((resposta) => {
        setDados(resposta.data);
      })
      .catch((erro) => {
        if (erro.response && erro.response.status === 404) {
          console.log("Nenhum dado de dashboard encontrado.");
        } else {
          console.log("Erro ao carregar dashboard:", erro.message);
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  //  grafico 1- materiais menor margem de estoque 
  const opcoesGraficoMateriaisMargem = {
    color: ["#896D95"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: dados?.graficoMateriaisMargem?.map((m) => m.nome) ?? [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999", fontSize: 11 },
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        name: "Margem de Estoque (%)",
        type: "bar",
        data: dados?.graficoMateriaisMargem?.map((m) =>
          Number(m.margemEstoquePercentual).toFixed(1)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  //  grfico 2- produtos com maior lucro
  const opcoesGraficoProdutosLucro = {
    color: ["#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: dados?.graficoProdutosLucro?.map((p) => p.nome) ?? [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999", fontSize: 11 },
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        name: "Lucro Total no Mês (R$)",
        type: "bar",
        data: dados?.graficoProdutosLucro?.map((p) =>
          Number(p.lucroTotalMes).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  // grafico 3- produtos com maior crescimento 
  const opcoesGraficoMaiorCrescimento = {
    color: ["#896D95", "#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Mês Anterior", "Mês Atual"],
      right: 0,
      top: 0,
      icon: "circle",
      textStyle: { color: "#999", fontSize: 11 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: dados?.graficoMaiorCrescimento?.map((p) => p.nome) ?? [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999", fontSize: 11 },
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        name: "Mês Anterior",
        type: "bar",
        barGap: 0,
        data: dados?.graficoMaiorCrescimento?.map((p) =>
          Number(p.vendasMesAnterior).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "Mês Atual",
        type: "bar",
        data: dados?.graficoMaiorCrescimento?.map((p) =>
          Number(p.vendasMesAtual).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  // grafico 4- produtos com menor crescimento 
  const opcoesGraficoMenorCrescimento = {
    color: ["#896D95", "#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Mês Anterior", "Mês Atual"],
      right: 0,
      top: 0,
      icon: "circle",
      textStyle: { color: "#999", fontSize: 11 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: dados?.graficoMenorCrescimento?.map((p) => p.nome) ?? [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999", fontSize: 11 },
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        name: "Mês Anterior",
        type: "bar",
        barGap: 0,
        data: dados?.graficoMenorCrescimento?.map((p) =>
          Number(p.vendasMesAnterior).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "Mês Atual",
        type: "bar",
        data: dados?.graficoMenorCrescimento?.map((p) =>
          Number(p.vendasMesAtual).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  //  kpi
  const kpis = [
    {
      label: "Material Mais Utilizado",
      valor: dados?.kpiMaterialMaisUtilizado?.nome ?? "—",
      detalhe: dados?.kpiMaterialMaisUtilizado?.qtd_estoque != null
        ? `${Number(dados.kpiMaterialMaisUtilizado.qtd_estoque).toFixed(0)} em estoque`
        : null,
    },
    {
      label: "Material Menos Utilizado",
      valor: dados?.kpiMaterialMenosUtilizado?.nome ?? "—",
      detalhe: dados?.kpiMaterialMenosUtilizado?.qtd_estoque != null
        ? `${Number(dados.kpiMaterialMenosUtilizado.qtd_estoque).toFixed(0)} em estoque`
        : null,
    },
    {
      label: "Produto Mais Encomendado",
      valor: dados?.kpiProdutoMaisEncomendado?.nome ?? "—",
      detalhe: dados?.kpiProdutoMaisEncomendado?.totalPedidos != null
        ? `${dados.kpiProdutoMaisEncomendado.totalPedidos} pedidos`
        : null,
    },
    {
      label: "Produto Menos Encomendado",
      valor: dados?.kpiProdutoMenosEncomendado?.nome ?? "—",
      detalhe: dados?.kpiProdutoMenosEncomendado?.totalPedidos != null
        ? `${dados.kpiProdutoMenosEncomendado.totalPedidos} pedidos`
        : null,
    },
  ];

  const graficos = [
    { titulo: "Materiais com Menor Margem de Estoque", opcoes: opcoesGraficoMateriaisMargem },
    { titulo: "Produtos com Maior Lucro no Mês", opcoes: opcoesGraficoProdutosLucro },
    { titulo: "Produtos com Maior Crescimento", opcoes: opcoesGraficoMaiorCrescimento },
    { titulo: "Produtos com Menor Crescimento", opcoes: opcoesGraficoMenorCrescimento },
  ];

  return (
    <div className="flex">
      <Nav tela="Dashboard" />
      <main className="flex-1 h-full p-10 flex flex-col min-h-0 bg-white font-sans text-gray-800">

        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">Dashboard</h1>
          <p className="text-gray-400 m-0">Visão geral dos seus produtos e materiais</p>
        </header>

        {carregando ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* kpi */}
            <section className="grid grid-cols-4 gap-5 mb-4 shrink-0">
              {kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 text-center shadow-sm"
                >
                  <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
                  <h2 className="text-xl font-bold text-[#896D95] m-0 truncate">{kpi.valor}</h2>
                  {kpi.detalhe && (
                    <p className="text-[#896D95] text-xs mt-2 font-medium">{kpi.detalhe}</p>
                  )}
                </div>
              ))}
            </section>

            {/* Gráficos */}
            <section className="grid grid-cols-2 grid-rows-2 gap-6 flex-1">
              {graficos.map((grafico, index) => (
                <div
                  key={index}
                  className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col"
                >
                  <h3 className="text-gray-400 text-sm font-semibold mb-6">{grafico.titulo}</h3>
                  <div className="flex-1 w-full min-h-0">
                    <ReactECharts
                      option={grafico.opcoes}
                      style={{ height: "100%", width: "100%" }}
                      opts={{ renderer: "svg" }}
                    />
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

      </main>
    </div>
  );
}