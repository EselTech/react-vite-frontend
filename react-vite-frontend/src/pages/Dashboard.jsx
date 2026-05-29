import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

// Utilitário: retorna nome do mês atual em português
function getMesAtual() {
  return new Date().toLocaleString("pt-BR", { month: "long" });
}

function getMesAnterior() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d.toLocaleString("pt-BR", { month: "long" });
}

// Capitaliza primeira letra
function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

  // Configuração base reutilizável para todos os gráficos
  const baseGrid = { left: "2%", right: "2%", bottom: "8%", top: "12%", containLabel: true };
  const baseXAxis = (data) => ({
    type: "category",
    data,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: "#aaa", fontSize: 11, interval: 0, overflow: "truncate", width: 80 },
  });
  const baseYAxis = { type: "value", show: false };
  const baseTooltip = { trigger: "axis", axisPointer: { type: "shadow" } };

  // Gráfico 1 - Materiais com menor margem de estoque
  const opcoesGraficoMateriaisMargem = {
    color: ["#896D95"],
    tooltip: baseTooltip,
    grid: baseGrid,
    xAxis: baseXAxis(dados?.graficoMateriaisMargem?.map((m) => m.nome) ?? []),
    yAxis: baseYAxis,
    series: [
      {
        name: "Margem de Estoque (%)",
        type: "bar",
        data: dados?.graficoMateriaisMargem?.map((m) =>
          Number(m.margemEstoquePercentual).toFixed(1)
        ) ?? [],
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          color: "#896D95",
          fontSize: 11,
          fontWeight: "bold",
          formatter: (p) => `${p.value}%`,
        },
      },
    ],
  };

  // Gráfico 2 - Produtos com maior lucro
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
          formatter: (p) => `R$ ${Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        },
      },
    ],
  };

  // Gráfico 3 - Produtos com maior crescimento
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
    xAxis: baseXAxis(dados?.graficoMaiorCrescimento?.map((p) => p.nome) ?? []),
    yAxis: baseYAxis,
    series: [
      {
        name: "Crescimento",
        type: "bar",
        data: dados?.graficoMaiorCrescimento?.map((p) =>
          Number(p.taxaCrescimentoPercentual ?? 0)
        ) ?? [],
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

  // Gráfico 4 - Produtos com menor crescimento
  const opcoesGraficoMenorCrescimento = {
    color: ["#C8A0C0"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = params[0];
        return `${p.name}<br/>${p.seriesName}: <b>${Number(p.value).toFixed(2)}%</b>`;
      },
    },
    grid: baseGrid,
    xAxis: baseXAxis(dados?.graficoMenorCrescimento?.map((p) => p.nome) ?? []),
    yAxis: baseYAxis,
    series: [
      {
        name: "Crescimento",
        type: "bar",
        data: dados?.graficoMenorCrescimento?.map((p) =>
          Number(p.taxaCrescimentoPercentual ?? 0)
        ) ?? [],
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          color: "#C8A0C0",
          fontSize: 11,
          fontWeight: "bold",
          formatter: (p) => `${Number(p.value).toFixed(2)}%`,
        },
      },
    ],
  };

  // KPIs — todos com o mês atual no label
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

  // Gráficos — títulos com o mês atual
  const graficos = [
    {
      titulo: "Materiais com Menor Margem de Estoque",
      subtitulo: mesAtual,
      opcoes: opcoesGraficoMateriaisMargem,
    },
    {
      titulo: "Produtos com Maior Lucro",
      subtitulo: mesAtual,
      opcoes: opcoesGraficoProdutosLucro,
    },
    {
      titulo: "Produtos com Maior Crescimento",
      subtitulo: `${mesAnterior} → ${mesAtual}`,
      opcoes: opcoesGraficoMaiorCrescimento,
    },
    {
      titulo: "Produtos com Menor Crescimento",
      subtitulo: `${mesAnterior} → ${mesAtual}`,
      opcoes: opcoesGraficoMenorCrescimento,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F5FA]">
      <Nav tela="Dashboard" />

      <main className="flex-1 flex flex-col p-8 gap-6 overflow-auto font-sans text-gray-800">

        {/* Cabeçalho */}
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#634C89] leading-tight">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Visão geral dos seus produtos e materiais — <span className="font-medium text-[#896D95]">{mesAtual}</span>
            </p>
          </div>
        </header>

        {carregando ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* KPIs */}
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

            {/* Gráficos */}
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

                  {/* Gráfico */}
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