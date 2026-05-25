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
  const [pedidos, setPedidos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);

  function carregarDados() {
    Promise.allSettled([
      api.get("/pedidos"),
      api.get("/orcamentos"),
      api.get("/notificacoes"),
    ]).then(([resPedidos, resOrcamentos, resNotif]) => {
      if (resPedidos.status === "fulfilled") setPedidos(resPedidos.value.data);
      if (resOrcamentos.status === "fulfilled") setOrcamentos(resOrcamentos.value.data);
      if (resNotif.status === "fulfilled") setNotificacoes(resNotif.value.data);
    });
  }

  useEffect(() => { carregarDados(); }, []);

  // kpi
  const receita   = pedidos.filter((p) => p.status === "shipped").reduce((acc, p) => acc + Number(p.valor ?? 0), 0);
  const despesa   = pedidos.filter((p) => p.status === "cancelled").reduce((acc, p) => acc + Number(p.valor ?? 0), 0);
  const resultado = receita - despesa;
  const aReceber  = orcamentos.reduce((acc, o) => acc + Number(o.valor ?? 0), 0);

  const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const kpis = [
    { title: "RECEITA",    value: fmt(receita) },
    { title: "DESPESA",    value: fmt(despesa) },
    { title: "RESULTADOS", value: fmt(resultado) },
    { title: "A RECEBER",  value: fmt(aReceber) },
  ];

  // Alertas
  const alertas = [...notificacoes]
    .sort((a, b) => new Date(b.dtEnvio) - new Date(a.dtEnvio));

  // grafico 1 ´pedidos por status
  const statusLabel = {
    open: "Abertos", ongoing: "Em andamento", shipped: "Enviados",
    late: "Atrasados", cancelled: "Cancelados",
  };

  const optPedidos = {
    color: ["#896D95", "#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Pedidos"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: Object.values(statusLabel),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999" },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Pedidos",
      type: "bar",
      barGap: 0,
      data: Object.keys(statusLabel).map((k) => pedidos.filter((p) => p.status === k).length),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    }],
  };

  // grafico 2 top 5 orçamentos por valor
  const top5 = [...orcamentos].sort((a, b) => Number(b.valor) - Number(a.valor)).slice(0, 5);

  const optOrcamentos = {
    color: ["#896D95", "#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Valor"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: top5.map((o) => o.titulo ?? o.cliente ?? "—"),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999" },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Valor",
      type: "bar",
      barGap: 0,
      data: top5.map((o) => Number(o.valor).toFixed(2)),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    }],
  };

  const graficos = [
    { titulo: "Pedidos por Status",          opt: optPedidos },
    { titulo: "Top 5 Orçamentos por Valor",  opt: optOrcamentos },
  ];

  return (
    <div className="flex">
      <Nav tela="Home" />
      <main className="flex-1 h-full p-6 flex flex-col bg-white font-sans text-gray-800 overflow-hidden">

        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">
            Bem-vinda de volta, Cibelle!
          </h1>
          <p className="text-gray-400 m-0">
            Aqui está um resumo do seu ateliê hoje 
          </p>
        </header>

        {/*kpi e alertas*/}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-4 shrink-0">

          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2  gap-6">
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

        {/*graficos*/}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-70">
          {graficos.map((g, i) => (
            <div key={i} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">{g.titulo}</h3>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ReactECharts
                  option={g.opt}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}