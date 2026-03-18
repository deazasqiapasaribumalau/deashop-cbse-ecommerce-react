// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

export default function ProductDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const renderStars = (rate) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 16 16">
        <path
          fill={i < Math.round(rate) ? '#EF9F27' : '#D8D4CB'}
          d="M8 1.1l1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z"
        />
      </svg>
    ));

  if (loading) return <Loading />;
  if (error)   return <p style={{ padding:'2rem', color:'red' }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth:880, margin:'0 auto', padding:'1.75rem' }}>
      <button onClick={() => navigate(-1)} style={s.back}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Kembali ke Katalog
      </button>

      <div style={s.grid}>
        {/* Gambar */}
        <div style={s.imgWrap}>
          <span style={s.imgBadge}>{product.category}</span>
          <img src={product.image} alt={product.title} style={s.img}/>
        </div>

        {/* Info */}
        <div>
          <p style={s.cat}>{product.category}</p>
          <h1 style={s.title}>{product.title}</h1>

          <div style={s.ratingRow}>
            <div style={{ display:'flex', gap:3 }}>{renderStars(product.rating.rate)}</div>
            <span style={s.ratingTxt}>
              {product.rating.rate} · {product.rating.count} ulasan
            </span>
          </div>

          <div style={s.price}>${product.price.toFixed(2)}</div>
          <p style={s.desc}>{product.description}</p>

          {/* Qty — Tugas 1 */}
          <div style={s.qtyRow}>
            <button style={s.qb} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span style={s.qv}>{qty}</span>
            <button style={s.qb} onClick={() => setQty(q => q + 1)}>+</button>
            <span style={{ fontSize:13, color:'#A09A90' }}>pcs</span>
          </div>

          <button
            onClick={handleAdd}
            style={{ ...s.addBtn, background: added ? '#3D7A72' : '#C9736A' }}
          >
            {added ? '✓ Berhasil Ditambahkan!' : '+ Tambah ke Keranjang'}
          </button>

          <div style={s.chips}>
            <span style={s.chip}>✓ Stok Tersedia</span>
            <span style={s.chip}>🚚 Free ongkir &gt; $100</span>
            <span style={s.chip}>↩ Return 30 hari</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  back: { display:'inline-flex', alignItems:'center', gap:6, fontSize:13, color:'#A09A90', cursor:'pointer', marginBottom:'1.5rem', border:'none', background:'transparent', fontFamily:"'DM Sans', sans-serif", padding:0, transition:'color .15s' },
  grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'start' },
  imgWrap: { background:'#EAE7E0', borderRadius:20, aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', padding:'2.5rem', position:'relative' },
  imgBadge: { position:'absolute', top:14, left:14, background:'#C9736A', color:'#fff', fontSize:11, fontWeight:500, padding:'4px 11px', borderRadius:99 },
  img: { maxHeight:270, objectFit:'contain', width:'100%' },
  cat: { fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#A09A90', fontWeight:500, marginBottom:'.5rem' },
  title: { fontFamily:"'Fraunces', serif", fontSize:26, fontStyle:'italic', fontWeight:300, lineHeight:1.3, marginBottom:'.85rem', color:'#0D0D0D' },
  ratingRow: { display:'flex', alignItems:'center', gap:8, paddingBottom:'1rem', marginBottom:'1rem', borderBottom:'1px solid #D8D4CB' },
  ratingTxt: { fontSize:13, color:'#A09A90', fontFamily:'monospace' },
  price: { fontFamily:"'Bebas Neue', sans-serif", fontSize:34, letterSpacing:'.04em', color:'#C9736A', marginBottom:'.75rem' },
  desc: { fontSize:13.5, color:'#666', lineHeight:1.8, marginBottom:'1.5rem' },
  qtyRow: { display:'flex', alignItems:'center', gap:12, marginBottom:'1.25rem' },
  qb: { width:36, height:36, borderRadius:9, border:'1px solid #D8D4CB', background:'#fff', cursor:'pointer', fontSize:19, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans', sans-serif", transition:'border-color .15s' },
  qv: { fontSize:17, fontWeight:500, minWidth:28, textAlign:'center', fontFamily:"'Bebas Neue', sans-serif", letterSpacing:'.05em' },
  addBtn: { width:'100%', padding:14, color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:500, fontFamily:"'DM Sans', sans-serif", cursor:'pointer', letterSpacing:'.03em', transition:'background .2s' },
  chips: { display:'flex', gap:8, marginTop:'1rem', flexWrap:'wrap' },
  chip: { fontSize:11, color:'#A09A90', background:'#F5F3EE', padding:'5px 11px', borderRadius:7, border:'1px solid #D8D4CB' },
};