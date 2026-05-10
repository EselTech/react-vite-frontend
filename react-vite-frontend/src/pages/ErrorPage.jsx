import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="font-text min-h-screen bg-[#f0ebf8] flex items-center justify-center p-8">

      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-[0_4px_32px_rgba(150,100,180,0.10)]">

        <div className="floaty w-35 h-35 mx-auto mb-5">
          <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="68" fill="#ede5f7"/>
            <rect x="38" y="34" width="64" height="76" rx="8" fill="white" stroke="#c4a8e8" strokeWidth="1.5"/>
            <line x1="50" y1="54" x2="90" y2="54" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round"/>
            <line x1="50" y1="64" x2="90" y2="64" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round"/>
            <line x1="50" y1="74" x2="78" y2="74" stroke="#e0d0f5" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="57" cy="88" r="2.5" fill="#b99ade"/>
            <circle cx="83" cy="88" r="2.5" fill="#b99ade"/>
            <path d="M62 98 Q70 93 78 98" fill="none" stroke="#b99ade" strokeWidth="2" strokeLinecap="round"/>
            <text x="70" y="32" textAnchor="middle" fontFamily="Nunito,sans-serif" fontSize="18" fontWeight="800" fill="#c4a8e8">?</text>
            <g transform="translate(22,38) rotate(-20)">
              <ellipse cx="0" cy="-7" rx="7" ry="5" fill="#d4b8f0" opacity="0.85"/>
              <ellipse cx="0" cy="7" rx="5" ry="4" fill="#c4a0e8" opacity="0.75"/>
            </g>
            <g transform="translate(115,48) rotate(15)">
              <ellipse cx="0" cy="-6" rx="6" ry="4.5" fill="#f0c8e8" opacity="0.85"/>
              <ellipse cx="0" cy="6" rx="4.5" ry="3.5" fill="#e8b0d8" opacity="0.75"/>
            </g>
            <text x="108" y="36" textAnchor="middle" fontSize="12" fill="#c4a8e8">✦</text>
            <text x="30" y="100" textAnchor="middle" fontSize="9" fill="#d4b8f0">✦</text>
          </svg>
        </div>

        <h1 className="text-7xl font-extrabold text-[#7c5cbf] leading-none tracking-tight mb-1">
          404
        </h1>

        <h2 className="text-xl font-bold text-[#4a3670] mb-2">
          Página não encontrada
        </h2>

        <p className="text-sm text-[#9e8ab8] leading-relaxed mb-8">
          A página que você tentou acessar não existe ou foi removida.<br />
          Verifique o endereço ou volte para continuar navegando.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-[#7c5cbf] hover:bg-[#6448a8] text-white font-bold text-base rounded-full py-3.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer border-none"
        >
          Voltar ao início
        </button>

      </div>
    </div>
  );
}