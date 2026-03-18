// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';

export default function Home() {
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [activeCat, setActiveCat]     = useState('all');
  const [searchQ, setSearchQ]         = useState('');
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = products
    .filter(p => activeCat === 'all' || p.category === activeCat)
    .filter(p => p.title.toLowerCase().includes(searchQ.toLowerCase()));

  if (loading) return <Loading />;
  if (error)   return <p style={{ padding:'2rem', color:'red' }}>Error: {error}</p>;

  return (
    <div>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroLeft}>
          <div style={s.eyebrow}>
            <div style={s.eyebrowDot}/>
            <span style={s.eyebrowTxt}>New Collection 2026</span>
          </div>
          <h1 style={s.heroH}>
            FIND<br/>YOUR <span style={{ color:'#C9736A' }}>STYLE</span><br/>HERE.
          </h1>
          <p style={s.heroP}>
            Koleksi produk terpilih dengan kualitas terbaik.
            Aesthetic, kekinian, dan terpercaya — hanya di DeaShop.
          </p>
        </div>
        <div style={s.heroRight}>
          {products.slice(0, 3).map((p, i) => (
            <div key={p.id} style={{ ...s.hcard, ...(i === 1 ? s.hcardTall : {}) }}>
              <div style={s.hcardImg}>
                <img src={p.image} alt={p.title} style={{ height:65, objectFit:'contain' }}/>
              </div>
              <div style={s.hcardLabel}>{p.category.split("'")[0].trim()}</div>
              <div style={s.hcardPrice}>${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search — Tugas 2 */}
      <SearchBar onSearch={setSearchQ} />

      {/* Filter Kategori */}
      <div style={s.catsRow}>
        {['all', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{ ...s.chip, ...(activeCat === cat ? s.chipOn : {}) }}
          >
            {cat === 'all' ? 'Semua' : cat}
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div style={s.secHdr}>
        <h2 style={s.secTitle}>Semua Produk</h2>
        <span style={s.secCount}>{filtered.length} produk</span>
      </div>

      {/* Grid */}
      <div style={s.grid}>
        {filtered.length === 0 && (
          <p style={{ gridColumn:'1/-1', textAlign:'center', color:'#A09A90', padding:'3rem' }}>
            Tidak ada produk yang cocok.
          </p>
        )}
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <span style={s.footerBrand}>DeaShop</span>
        <span>Dea Zasqia Pasaribu Malau · 2308107010004 · Praktikum PLBK 2026</span>
        <span>Pertemuan 5</span>
      </footer>
    </div>
  );
}

const s = {
  hero: { background:'#0D0D0D', padding:'3rem 1.75rem 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', alignItems:'end', overflow:'hidden', minHeight:280 },
  heroLeft: { paddingBottom:'2.5rem' },
  eyebrow: { display:'flex', alignItems:'center', gap:8, marginBottom:'1rem' },
  eyebrowDot: { width:7, height:7, borderRadius:'50%', background:'#C9736A' },
  eyebrowTxt: { fontSize:11, color:'rgba(255,255,255,.45)', letterSpacing:'.1em', textTransform:'uppercase', fontWeight:500 },
  heroH: { fontFamily:"'Bebas Neue', sans-serif", fontSize:60, lineHeight:.95, letterSpacing:'.04em', color:'#fff', marginBottom:'1rem' },
  heroP: { fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.7, maxWidth:320, marginBottom:'1.5rem' },
  heroRight: { display:'flex', alignItems:'flex-end', gap:12, paddingBottom:0, justifyContent:'center' },
  hcard: { background:'#EAE7E0', borderRadius:'14px 14px 0 0', padding:'1rem 1rem .85rem', width:115, cursor:'pointer' },
  hcardTall: { width:125, background:'#F5F3EE' },
  hcardImg: { height:85, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'.6rem' },
  hcardLabel: { fontSize:10, color:'#A09A90', fontWeight:500, letterSpacing:'.04em', marginBottom:2 },
  hcardPrice: { fontFamily:"'Bebas Neue', sans-serif", fontSize:16, letterSpacing:'.04em', color:'#0D0D0D' },
  catsRow: { display:'flex', gap:8, padding:'.75rem 1.75rem .5rem', flexWrap:'wrap' },
  chip: { fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:500, padding:'5px 14px', borderRadius:99, border:'1px solid #D8D4CB', background:'transparent', color:'#A09A90', cursor:'pointer', letterSpacing:'.03em', transition:'all .18s' },
  chipOn: { background:'#C9736A', color:'#fff', borderColor:'#C9736A' },
  secHdr: { display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'.75rem 1.75rem .5rem' },
  secTitle: { fontFamily:"'Fraunces', serif", fontSize:22, fontStyle:'italic', fontWeight:300 },
  secCount: { fontSize:12, color:'#A09A90', fontFamily:'monospace' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(195px, 1fr))', gap:'1rem', padding:'.5rem 1.75rem 2.5rem' },
  footer: { background:'#0D0D0D', color:'rgba(255,255,255,.35)', padding:'.85rem 1.75rem', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, letterSpacing:'.04em' },
  footerBrand: { fontFamily:"'Bebas Neue', sans-serif", fontSize:16, letterSpacing:'.1em', color:'rgba(255,255,255,.6)' },
};