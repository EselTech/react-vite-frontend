import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

function tempoRelativo(dtEnvio) {
  if (!dtEnvio) return "";
  const diffMin = Math.floor((new Date() - new Date(dtEnvio)) / 60000);
  if (diffMin < 2) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH} hora${diffH > 1 ? "s" : ""}`;
  const diffD = Math.floor(diffH / 24);
  return `há ${diffD} dia${diffD > 1 ? "s" : ""}`;
}

function corAlerta(topico = "") {
  const t = topico.toLowerCase();
  if (t.includes("crítico") || t.includes("urgente") || t.includes("estoque")) return "#FF8A65";
  return "#FFCA28";
}

export function Home() {
  // estado para armazenar os dados
  const [dashboardData, setDashboardData] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  function carregarDados() {
    const empresaId = 1;

    Promise.allSettled([
      api.get(`/home/${empresaId}`),
      api.get("/notificacoes"),
    ]).then(([resHome, resNotif]) => {
      if (resHome.status === "fulfilled") setDashboardData(resHome.value.data);
      if (resNotif.status === "fulfilled") setNotificacoes(resNotif.value.data);
    })
  }

  useEffect(() => { carregarDados(); }, []);

  // formatação moeda
  const fmt = (v) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // mapeamento kpi
  const kpis = [
    { title: "RECEITA MENSAL", value: fmt(dashboardData?.receitaKPIDTO?.receita_total) },
    { title: "DESPESA MENSAL", value: fmt(dashboardData?.despesaKPIDTO?.despesa_total) },
    { title: "LUCRO MENSAL", value: fmt(dashboardData?.lucroKPIDTO?.lucro) },
    { title: "A RECEBER ESTE MÊS", value: fmt(dashboardData?.receberKPIDTO?.valor_a_receber) },
  ];

  // ordenação de Alertas
  const alertas = [...notificacoes].sort((a, b) => new Date(b.dtEnvio) - new Date(a.dtEnvio));

  // traduzindo dados banco
  const statusLabel = {
    open: "Abertos",
    ongoing: "Em andamento",
    shipped: "Enviados",
    late: "Atrasados",
    cancelled: "Cancelados",
  };

  // grafico 1 pedidos por status
  const dadosPedidosStatus = dashboardData?.pedidosPorStatus ?? [];
  const optPedidos = {
    color: ["#896D95"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Pedidos"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: dadosPedidosStatus.map((p) => statusLabel[p.status] || p.status),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999" },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Pedidos",
      type: "bar",
      data: dadosPedidosStatus.map((p) => p.total),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      barWidth: 50
    }],
  };

  // meses graf 2
  const mesesNome = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // grafico 2 - receita anual
  const dadosReceitaAnual = dashboardData?.receitaAnual ?? [];
  const optReceitaAnual = {
    color: ["#C8A0C0"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => `${params[0].name}: <b>${fmt(params[0].value)}</b>`
    },
    legend: {
      data: ["Faturamento"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: dadosReceitaAnual.map((r) => mesesNome[r.mes - 1] || `Mês ${r.mes}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999" },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Faturamento",
      type: "bar",
      data: dadosReceitaAnual.map((r) => r.valor),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    }],
  };

  // grafico 3 - Materiais Mais Saídos
  const [categoriaMaterial, setCategoriaMaterial] = useState("INTEIRO")
  const dadosMateriaisCategoria = dashboardData?.materiaisPorCategoria ?? []
  const optMateriaisCategoria = {
    color: ["#C8A0C0"],
    legend: {
      data: ["Quantidade"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    // CORREÇÃO: Aumentado o bottom de 0% para 25% para abrir espaço para o texto inclinado
    grid: { left: "2%", right: "2%", },
    xAxis: {
      type: "category",
      data: (dadosMateriaisCategoria.filter(material => material.categoria == categoriaMaterial)).map(material => material.nome),
      axisLine: { show: false },
      axisTick: { show: false },
      // CORREÇÃO: Rotacionando as legendas e forçando a exibição de todas
      axisLabel: {
        color: "#999",
        // rotate: 45,    // Inclina o texto em 45 graus
        interval: 0    // Força a exibição de 100% dos nomes dos materiais
      },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Quantidade",
      type: "bar",
      data: (dadosMateriaisCategoria.filter(material => material.categoria == categoriaMaterial)).map(material => material.valorTotal),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      barWidth: 50
    }],
  }

  console.log((dadosMateriaisCategoria.filter(material => material.categoria == categoriaMaterial)).map(material => material.valorTotal));


  const graficos = [
    { titulo: "Quantidade de Pedidos Mensal por Status", opt: optPedidos },
    { titulo: "Receita Anual por Mês", opt: optReceitaAnual },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Nav tela="Home" />
      <main className="flex-1 h-screen p-6 flex flex-col bg-white font-sans text-gray-800 overflow-y-auto">

        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">
            Bem-vinda de volta, Cibelle!
          </h1>
          <p className="text-gray-400 m-0">
            Aqui está um resumo do seu ateliê hoje
          </p>
        </header>

        {/* kpi e alertas */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-4 shrink-0">

          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-4 shadow-sm flex flex-col justify-center">
                <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">
                  {kpi.title}
                </p>
                <h2 className="text-4xl font-bold text-[#896D95] m-0 mb-2">
                  {kpi.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 shadow-sm flex flex-col col-span-2">
            <h2 className="text-xl font-bold text-[#634C89] mb-4">Alertas</h2>

            <ul className="flex flex-col gap-3 overflow-y-auto max-h-36">
              {alertas.length === 0 ? (
                <li className="text-gray-400 text-sm">Nenhuma notificação no momento.</li>
              ) : alertas.map((n, i) => (
                <li key={n.id ?? i} className="flex items-start border-b border-[#EFEFEF] pb-3 last:border-0 last:pb-0">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 mr-3 shrink-0"
                    style={{ backgroundColor: corAlerta(n.topico) }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs md:text-sm text-gray-600 font-medium leading-tight pr-2">
                        {n.mensagem}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400">{tempoRelativo(n.dtEnvio)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* graficos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-70">
          {graficos.map((g, i) => (
            <div key={i} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-80">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">{g.titulo}</h3>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ReactECharts
                  option={g.opt}
                  style={{ height: "100%", width: "100%" }}
                  opts={{ renderer: "svg" }}
                />
              </div>
            </div>
          ))}
          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-80 col-span-2">

            <div className="flex gap-10 items-center mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Materiais Mais Utilizados em Produtos por Categoria</h3>

              <select
                className=" text-sm font-semibold font-text border border-[#eadeef] rounded-md px-2 outline-none focus:border-[#896D95] text-gray-400"
                onChange={e => {
                  setCategoriaMaterial(e.target.value)
                }}>
                <option value="INTEIRO">Unidade</option>
                <option value="MILILITRO">Mililitros</option>
                <option value="GRAMA">Gramas</option>
                <option value="CENTIMETRO">Centímetro</option>
              </select>
            </div>


            <div className="flex-1 w-full min-h-0">
              <ReactECharts
                option={optMateriaisCategoria}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: "svg" }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
