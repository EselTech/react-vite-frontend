import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

// retorna nome do mes atual em portugues
function getMesAtual() {
  return new Date().toLocaleString("pt-BR", { month: "long" });
}

function getMesAnterior() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d.toLocaleString("pt-BR", { month: "long" });
}

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const MESES_ABREV = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function Dashboard() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const EMPRESA_ID = 1;
  const mesAtual = cap(getMesAtual());
  const mesAnterior = cap(getMesAnterior());

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

  // base para os gráficos
  const baseGrid = { left: "2%", right: "2%", bottom: "8%", top: "12%", containLabel: true };
  const baseXAxis = (data) => ({
    type: "category",
    data,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: "#aaa", fontSize: 11, interval: 0, overflow: "truncate", width: 80 },
  });
  const baseYAxis = {
    type: "value",
    show: true,
    splitNumber: 4,
    axisLabel: { show: true, color: "#bbb", fontSize: 10 },
    splitLine: { lineStyle: { color: "#F0EAF7", type: "dashed" } },
    axisLine: { show: false },
    axisTick: { show: false },
  };
  const baseTooltip = { trigger: "axis", axisPointer: { type: "shadow" } };

  // grafico 1 - produtos com maior lucro
  const opcoesGraficoProdutosLucro = {
    color: ["#C8A0C0"],
    tooltip: baseTooltip,
    grid: baseGrid,
    xAxis: baseXAxis(dados?.graficoProdutosLucro?.map((p) => p.nome) ?? []),
    yAxis: baseYAxis,
    series: [
      {
        name: "Lucro Total no Mês (R$)",
        type: "bar",
        data: dados?.graficoProdutosLucro?.map((p) =>
          Number(p.lucroTotalMes).toFixed(2)
        ) ?? [],
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          color: "#C8A0C0",
          fontSize: 11,
          fontWeight: "bold",
          formatter: (p) =>
            `R$ ${Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        },
      },
    ],
  };

  // grafico 2 - produtos com maior crescimento
  const opcoesGraficoMaiorCrescimento = {
    color: ["#896D95"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = params[0];
        return `${p.name}<br/>${p.seriesName}: <b>${Number(p.value).toFixed(2)}%</b>`;
      },
    },
    grid: baseGrid,
    xAxis: baseXAxis(
      (dados?.graficoMaiorCrescimento ?? []).slice(0, 6).map((p) => p.nome)
    ),
    yAxis: baseYAxis,
    series: [
      {
        name: "Crescimento",
        type: "bar",
        data: (dados?.graficoMaiorCrescimento ?? [])
          .slice(0, 6)
          .map((p) => Number(p.taxaCrescimentoPercentual ?? 0)),
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          color: "#896D95",
          fontSize: 11,
          fontWeight: "bold",
          formatter: (p) => `${Number(p.value).toFixed(2)}%`,
        },
      },
    ],
  };

  // grfico 3 - produtos vendidos por trimestre
  const trimestre = dados?.produtosVendidosTrimestre;
  const opcoesGraficoTrimestre = {
    color: ["#896D95", "#C8A0C0", "#B08AC0", "#D4B8D8"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["T1", "T2", "T3", "T4"],
      bottom: 0,
      textStyle: { color: "#aaa", fontSize: 11 },
    },
    grid: { left: "2%", right: "2%", bottom: "18%", top: "12%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["T1 (Jan–Mar)", "T2 (Abr–Jun)", "T3 (Jul–Set)", "T4 (Out–Dez)"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#aaa", fontSize: 11 },
    },
    yAxis: baseYAxis,
    series: [
      {
        name: "T1",
        type: "bar",
        data: [Number(trimestre?.trimestre1 ?? 0), null, null, null],
        itemStyle: { borderRadius: [6, 6, 0, 0], color: "#896D95" },
        label: { show: true, position: "top", color: "#896D95", fontSize: 11, fontWeight: "bold" },
      },
      {
        name: "T2",
        type: "bar",
        data: [null, Number(trimestre?.trimestre2 ?? 0), null, null],
        itemStyle: { borderRadius: [6, 6, 0, 0], color: "#C8A0C0" },
        label: { show: true, position: "top", color: "#C8A0C0", fontSize: 11, fontWeight: "bold" },
      },
      {
        name: "T3",
        type: "bar",
        data: [null, null, Number(trimestre?.trimestre3 ?? 0), null],
        itemStyle: { borderRadius: [6, 6, 0, 0], color: "#B08AC0" },
        label: { show: true, position: "top", color: "#B08AC0", fontSize: 11, fontWeight: "bold" },
      },
      {
        name: "T4",
        type: "bar",
        data: [null, null, null, Number(trimestre?.trimestre4 ?? 0)],
        itemStyle: { borderRadius: [6, 6, 0, 0], color: "#D4B8D8" },
        label: { show: true, position: "top", color: "#D4B8D8", fontSize: 11, fontWeight: "bold" },
      },
    ],
  };

  // grafico 4 - receita anual por mes 
  const receitaAnualValores = dados?.receitaAnual?.map((r) => Number(r.valor ?? 0)) ?? [];
  const opcoesGraficoReceitaAnual = {
    color: ["#896D95"],
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const p = params[0];
        return `${p.name}<br/>Receita: <b>R$ ${Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b>`;
      },
    },
    grid: { left: "2%", right: "2%", bottom: "8%", top: "12%", containLabel: true },
    xAxis: {
      type: "category",
      data: MESES_ABREV,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#aaa", fontSize: 11 },
    },
    yAxis: baseYAxis,
    series: [
      {
        name: "Receita",
        type: "line",
        data: receitaAnualValores,
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: { color: "#896D95", width: 2.5 },
        itemStyle: { color: "#896D95", borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(137, 109, 149, 0.25)" },
              { offset: 1, color: "rgba(137, 109, 149, 0)" },
            ],
          },
        },
        label: { show: false },
      },
    ],
  };

  // kpis — todos com o mes atual no label
  const kpis = [
    {
      label: `Material Mais Utilizado em ${mesAtual}`,
      valor: dados?.kpiMaterialMaisUtilizado?.nome ?? "—",
      detalhe:
        dados?.kpiMaterialMaisUtilizado?.qtd_estoque != null
          ? `${Number(dados.kpiMaterialMaisUtilizado.qtd_estoque).toFixed(0)} em estoque`
          : null,
    },
    {
      label: `Material Menos Utilizado em ${mesAtual}`,
      valor: dados?.kpiMaterialMenosUtilizado?.nome ?? "—",
      detalhe:
        dados?.kpiMaterialMenosUtilizado?.qtd_estoque != null
          ? `${Number(dados.kpiMaterialMenosUtilizado.qtd_estoque).toFixed(0)} em estoque`
          : null,
    },
    {
      label: `Produto Mais Encomendado em ${mesAtual}`,
      valor: dados?.kpiProdutoMaisEncomendado?.nome ?? "—",
      detalhe:
        dados?.kpiProdutoMaisEncomendado?.totalPedidos != null
          ? `${dados.kpiProdutoMaisEncomendado.totalPedidos} pedidos`
          : null,
    },
    {
      label: `Produto Menos Encomendado em ${mesAtual}`,
      valor: dados?.kpiProdutoMenosEncomendado?.nome ?? "—",
      detalhe:
        dados?.kpiProdutoMenosEncomendado?.totalPedidos != null
          ? `${dados.kpiProdutoMenosEncomendado.totalPedidos} pedidos`
          : null,
    },
  ];

  // graficos
  const graficos = [
    {
      titulo: "Produtos com Maior Lucro",
      subtitulo: mesAtual,
      opcoes: opcoesGraficoProdutosLucro,
    },
    {
      titulo: "Produtos com Maior Crescimento de Demanda",
      subtitulo: `${mesAnterior} → ${mesAtual}`,
      opcoes: opcoesGraficoMaiorCrescimento,
    },
    {
      titulo: "Produtos Vendidos por Trimestre",
      subtitulo: new Date().getFullYear().toString(),
      opcoes: opcoesGraficoTrimestre,
    },
    {
      titulo: "Receita Anual por Mês",
      subtitulo: new Date().getFullYear().toString(),
      opcoes: opcoesGraficoReceitaAnual,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F5FA] h-screen overflow-hidden">
      <Nav tela="Dashboard" />

      <main className="flex-1 flex flex-col p-8 gap-6 overflow-auto font-sans text-gray-800 overflow-y-auto">

        {/* cabecalho */}
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#634C89] leading-tight">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Visão geral dos seus produtos e materiais —{" "}
              <span className="font-medium text-[#896D95]">{mesAtual}</span>
            </p>
          </div>
        </header>

        {carregando ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* kpis */}
            <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#EDE8F3] rounded-2xl px-5 py-5 shadow-sm flex flex-col gap-2"
                >
                  <p className="text-gray-400 text-xs font-medium leading-snug">{kpi.label}</p>
                  <h2 className="text-lg font-bold text-[#634C89] truncate leading-tight">{kpi.valor}</h2>
                  {kpi.detalhe && (
                    <span className="inline-block self-start bg-[#F0EAF7] text-[#896D95] text-xs font-semibold px-2 py-0.5 rounded-full">
                      {kpi.detalhe}
                    </span>
                  )}
                </div>
              ))}
            </section>

            {/* grficos */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 flex-1">
              {graficos.map((grafico, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#EDE8F3] rounded-2xl p-6 shadow-sm flex flex-col gap-3"
                >
                  {/* Cabeçalho do card */}
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-semibold text-gray-700">{grafico.titulo}</h3>
                    <span className="text-xs font-medium text-[#896D95] bg-[#F0EAF7] px-2 py-0.5 rounded-full whitespace-nowrap">
                      {grafico.subtitulo}
                    </span>
                  </div>

                  {/* grafico */}
                  <div className="flex-1 w-full" style={{ minHeight: "220px" }}>
                    <ReactECharts
                      option={grafico.opcoes}
                      style={{ height: "220px", width: "100%" }}
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