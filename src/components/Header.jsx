// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header style={s.nav}>
      {/* Kiri: Logo + Brand */}
      <div style={s.navLeft}>
        <div style={s.logoMark}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={s.brandName}>DeaShop</div>
          <div style={s.brandSub}>curated · aesthetic · kekinian</div>
        </Link>
      </div>

      {/* Tengah: Nav pills */}
      <nav style={s.navPills}>
        <Link
          to="/"
          style={{ ...s.npill, ...(location.pathname === '/' ? s.npillOn : {}) }}
        >
          Home
        </Link>
        <Link
          to="/cart"
          style={{ ...s.npill, ...(location.pathname === '/cart' ? s.npillOn : {}) }}
        >
          Cart
        </Link>
      </nav>

      {/* Kanan: Owner info + Cart button */}
      <div style={s.navRight}>
        <div style={s.ownerPill}>
          <div style={s.avatar}>DZ</div>
          <div>
            <div style={s.ownerName}>Dea Zasqia Pasaribu Malau</div>
            <div style={s.ownerNpm}>NPM · 2308107010004</div>
          </div>
        </div>
        <Link to="/cart" style={s.cartPill}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span style={s.cartN}>{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}

const s = {
  nav: { background:'#0D0D0D', color:'#fff', padding:'0 1.75rem', height:62, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:300 },
  navLeft: { display:'flex', alignItems:'center', gap:14 },
  logoMark: { width:34, height:34, background:'#C9736A', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  brandName: { fontFamily:"'Bebas Neue', sans-serif", fontSize:26, letterSpacing:'.12em', color:'#fff', lineHeight:1 },
  brandSub: { fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', lineHeight:1, marginTop:1 },
  navPills: { display:'flex', gap:4 },
  npill: { fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:500, letterSpacing:'.05em', color:'rgba(255,255,255,.55)', background:'transparent', padding:'7px 14px', borderRadius:99, cursor:'pointer', textDecoration:'none', transition:'all .2s' },
  npillOn: { color:'#0D0D0D', background:'#fff' },
  navRight: { display:'flex', alignItems:'center', gap:10 },
  ownerPill: { display:'flex', alignItems:'center', gap:8, padding:'5px 12px 5px 5px', borderRadius:99, border:'1px solid rgba(255,255,255,.15)' },
  avatar: { width:28, height:28, borderRadius:'50%', background:'#B8962E', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Bebas Neue', sans-serif", fontSize:13, color:'#0D0D0D', letterSpacing:'.03em' },
  ownerName: { fontSize:11, color:'rgba(255,255,255,.6)', lineHeight:1.2 },
  ownerNpm: { fontSize:10, color:'rgba(255,255,255,.35)', fontFamily:'monospace' },
  cartPill: { display:'flex', alignItems:'center', gap:8, background:'#C9736A', color:'#fff', padding:'8px 16px', borderRadius:99, cursor:'pointer', textDecoration:'none', fontSize:13, fontWeight:500, transition:'background .2s' },
  cartN: { fontFamily:"'Bebas Neue', sans-serif", fontSize:16, letterSpacing:'.05em' },
};