import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-[#f0ebf8] flex items-center justify-center p-8 font-text">

      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .floaty { animation: floaty 3s ease-in-out infinite; }
        .btn-voltar:hover { background: #6448a8 !important; }
      `}</style>

      <div className="bg-white rounded-3xl p-10 w-full max-w-md text-center"
        style={{ boxShadow: "0 4px 32px rgba(150,100,180,0.10)" }}>

        <div className="floaty w-36 h-36 mx-auto mb-5">
          <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="68" fill="#ede5f7" />
            <rect x="38" y="34" width="64" height="76" rx="8" fill="white" stroke="#c4a8e8" strokeWidth="1.5" />
            <line x1="50" y1="54" x2="90" y2="54" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="64" x2="90" y2="64" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="74" x2="78" y2="74" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="57" cy="88" r="2.5" fill="#b99ade" />
            <circle cx="83" cy="88" r="2.5" fill="#b99ade" />
            <path d="M62 98 Q70 93 78 98" fill="none" stroke="#b99ade" strokeWidth="2" strokeLinecap="round" />
            <text x="70" y="32" textAnchor="middle" fontFamily="Nunito,sans-serif" fontSize="18" fontWeight="800" fill="#c4a8e8">?</text>
            <g transform="translate(22,38) rotate(-20)">
              <ellipse cx="0" cy="-7" rx="7" ry="5" fill="#d4b8f0" opacity="0.85" />
              <ellipse cx="0" cy="7" rx="5" ry="4" fill="#c4a0e8" opacity="0.75" />
            </g>
            <g transform="translate(115,48) rotate(15)">
              <ellipse cx="0" cy="-6" rx="6" ry="4.5" fill="#f0c8e8" opacity="0.85" />
              <ellipse cx="0" cy="6" rx="4.5" ry="3.5" fill="#e8b0d8" opacity="0.75" />
            </g>
            <text x="108" y="36" textAnchor="middle" fontSize="12" fill="#c4a8e8">✦</text>
            <text x="30" y="100" textAnchor="middle" fontSize="9" fill="#d4b8f0">✦</text>
          </svg>
        </div>

        <h1 className="font-text text-8xl font-extrabold leading-none tracking-tight mb-1"
          style={{ color: "#7c5cbf" }}>
          404
        </h1>

        <h2 className="font-text text-xl font-bold mb-2" style={{ color: "#4a3670" }}>
          Página não encontrada
        </h2>

        <p className="font-text text-sm leading-relaxed mb-8" style={{ color: "#9e8ab8" }}>
          A página que você tentou acessar não existe ou foi removida.<br />
          Verifique o endereço ou volte para continuar navegando.
        </p>


        <button
          onClick={() => window.location.href = "/"}
          className="btn-voltar font-text w-full text-white font-bold text-base rounded-full py-3.5 transition-all duration-200 cursor-pointer border-none"
          style={{ background: "#7c5cbf" }}
        >
          Voltar ao início
        </button>

      </div>
    </div>
  );
}