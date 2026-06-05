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
  const [dashboardData, setDashboardData] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("")


  function carregarNomeUsuario() {
    api.get(`/usuario/find-by-id/${localStorage.getItem("userid")}`).then(resposta => setNomeUsuario(resposta.data.nome))
  }


  function carregarDados() {
    const empresaId = 1;

    Promise.allSettled([
      api.get(`/home/${empresaId}`),
      api.get("/notificacoes"),
      api.get("/pedidos"),
    ]).then(([resHome, resNotif, resPedidos]) => {
      if (resHome.status === "fulfilled") setDashboardData(resHome.value.data);
      if (resNotif.status === "fulfilled") setNotificacoes(resNotif.value.data);

      if (resPedidos.status === "fulfilled") {
        const pedidos = resPedidos.value.data;

        const mapaQtd = {};
        pedidos.forEach((pedido) => {
          pedido.listaProdutos?.forEach(({ produto, qtdProduto }) => {
            if (!produto?.nome) return;
            mapaQtd[produto.nome] = (mapaQtd[produto.nome] ?? 0) + (qtdProduto ?? 1);
          });
        });

        const agregado = Object.entries(mapaQtd)
          .map(([nome, total]) => ({ nome, total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        setProdutosMaisVendidos(agregado);
      }
    });
  }

  useEffect(() => {
    carregarDados()
    carregarNomeUsuario()
  }, []);

  const fmt = (v) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const kpis = [
    { title: "RECEITA MENSAL", value: fmt(dashboardData?.receitaKPIDTO?.receita_total) },
    { title: "DESPESA MENSAL", value: fmt(dashboardData?.despesaKPIDTO?.despesa_total) },
    { title: "LUCRO MENSAL", value: fmt(dashboardData?.lucroKPIDTO?.lucro) },
    { title: "A RECEBER ESTE MÊS", value: fmt(dashboardData?.receberKPIDTO?.valor_a_receber) },
  ];

  const alertas = [...notificacoes].sort((a, b) => new Date(b.dtEnvio) - new Date(a.dtEnvio));

  const statusLabel = {
    open: "Abertos",
    ongoing: "Em andamento",
    shipped: "Enviados",
    late: "Atrasados",
    cancelled: "Cancelados",
  };

  // grafico 1 - pedidos por status
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
      barWidth: 50,
    }],
  };

  // grafico 2 - produtos mais vendidos
  const optProdutosVendidos = {
    color: ["#C8A0C0"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Quantidade"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "25%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: produtosMaisVendidos.map((p) => p.nome),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#999",
        interval: 0,
        rotate: 0,
        overflow: "truncate",
        width: 80,
      },
    },
    yAxis: { type: "value", show: true, axisLabel: { color: "#999" }, splitLine: { lineStyle: { color: "#EFEFEF" } } },
    series: [{
      name: "Quantidade",
      type: "bar",
      data: produtosMaisVendidos.map((p) => p.total),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      barWidth: 40,
    }],
  };

  // grafico 3 - materiais por categoria
  const [categoriaMaterial, setCategoriaMaterial] = useState("INTEIRO");
  const dadosMateriaisCategoria = dashboardData?.materiaisPorCategoria ?? [];
  const optMateriaisCategoria = {
    color: ["#C8A0C0"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => `${params[0].name}: <b>${fmt(params[0].value)}</b>`
    },
    legend: {
      data: ["Quantidade"],
      right: 0, top: 0, icon: "circle",
      textStyle: { color: "#999", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "0%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: dadosMateriaisCategoria
        .filter((m) => m.categoria === categoriaMaterial)
        .map((m) => m.nome),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999", interval: 0 },
    },
    yAxis: { type: "value", show: false },
    series: [{
      name: "Quantidade",
      type: "bar",
      data: dadosMateriaisCategoria
        .filter((m) => m.categoria === categoriaMaterial)
        .map((m) => m.valorTotal),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      barWidth: 50,
    }],
  };

  const graficos = [
    { titulo: "Pedidos por Status", opt: optPedidos },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Nav tela="Home" />
      <main className="flex-1 h-screen p-6 flex flex-col bg-white font-sans text-gray-800 overflow-y-auto">

        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">
            Bem-vinda de volta, {nomeUsuario}
          </h1>
          <p className="text-gray-400 m-0 font-text">
            Aqui está um resumo do seu ateliê hoje
          </p>
        </header>

        {/* kpi e alertas */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-4 shrink-0 ">

          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-4 shadow-sm flex flex-col justify-center">
                <p className="text-gray-400 text-xs tracking-wider uppercase mb-1 font-medium font-title">
                  {kpi.title}
                </p>
                <h2 className="text-4xl font-bold text-[#896D95] m-0 mb-2">
                  {kpi.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-5 shadow-sm flex flex-col col-span-2">
            <h2 className="text-xl font-semibold text-[#634C89] mb-4 font-title">Alertas</h2>
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

          {/* grafico 1 - pedidos por status */}
          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm font-medium font-title">Quantidade de pedidos por Status</h3>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ReactECharts
                option={optPedidos}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: "svg" }}
              />
            </div>
          </div>

          {/* grafico 2 - produtos mais vendidos */}
          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm font-medium font-title">Produtos mais Vendidos no mês atual</h3>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ReactECharts
                option={optProdutosVendidos}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: "svg" }}
              />
            </div>
          </div>

          {/* grafico 3 - materiais por categoria */}
          <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-6 shadow-sm flex flex-col h-80 col-span-2">
            <div className="flex gap-10 items-center mb-4">
              <h3 className="text-gray-400 text-sm font-medium font-title">Materiais mais Utilizados no mês atual por Categoria</h3>
              <select
                className="text-sm font-semibold font-text border border-[#eadeef] rounded-md px-2 outline-none focus:border-[#896D95] text-gray-400"
                onChange={(e) => setCategoriaMaterial(e.target.value)}
              >
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