export function EmptyState({ onNew }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      minHeight:'calc(100vh - 66px)', textAlign:'center', padding:'40px 24px',
    }}>
      {/* Badge */}
      <div className="font-quicksand" style={{
        fontSize:11, fontWeight:700, letterSpacing:.8, textTransform:'uppercase',
        color:'#896D95', background:'#EDE0F0', borderRadius:999, padding:'6px 18px', marginBottom:28,
      }}>
        Gerenciador de Estoque
      </div>

      {/* Ícone flutuante */}
      <div className="hero-float" style={{
        width:170, height:170, borderRadius:'50%', margin:'0 auto 28px',
        background:'linear-gradient(135deg,#EDE0F0,#f5eaff)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:72,
        boxShadow:'0 8px 40px rgba(137,109,149,.15)',
      }}>🗃️</div>

      <h1 className="font-fredoka" style={{
        fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#3D2B4F',
        fontWeight:600, lineHeight:1.15, marginBottom:12,
      }}>
        Nenhum produto<br/>cadastrado ainda
      </h1>

      <p className="font-quicksand" style={{ fontSize:15, color:'#7a6688', maxWidth:400, lineHeight:1.7, fontWeight:500, marginBottom:32 }}>
        Cadastre seus produtos para visualizar e controlar seu estoque de forma fácil e organizada.
      </p>

      <button onClick={onNew} className="btn-grad font-quicksand"
        style={{
          border:'none', borderRadius:999, cursor:'pointer', fontWeight:700, fontSize:16,
          padding:'14px 36px', background:'linear-gradient(135deg,#896D95,#C8A0C0)', color:'#fff',
          boxShadow:'0 6px 24px rgba(137,109,149,.3)', transition:'all .2s',
          display:'inline-flex', alignItems:'center', gap:8,
        }}>
        Cadastrar Primeiro Produto
      </button>
    </div>
  );
}