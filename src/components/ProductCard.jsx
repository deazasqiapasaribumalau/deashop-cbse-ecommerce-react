// src/components/ProductCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const renderStars = (rate) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 16 16">
        <path
          fill={i < Math.round(rate) ? '#EF9F27' : '#D8D4CB'}
          d="M8 1.1l1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z"
        />
      </svg>
    ));

  return (
    <div style={s.card}>
      {/* Gambar */}
      <div style={s.imgArea}>
        <span style={s.catBadge}>
          {product.category.split(' ').slice(-1)[0]}
        </span>
        <img src={product.image} alt={product.title} style={s.img} />
      </div>

      {/* Body */}
      <div style={s.body}>
        <p style={s.catTxt}>{product.category}</p>
        <h3 style={s.name}>{product.title}</h3>

        <div style={s.starsRow}>
          {renderStars(product.rating.rate)}
          <span style={s.ratingCt}>
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        <div style={s.price}>${product.price.toFixed(2)}</div>

        {/* Garis pemisah */}
        <div style={s.divider} />

        {/* Tombol Detail + Keranjang */}
        <div style={s.btnRow}>
          <Link to={`/product/${product.id}`} style={s.btnDetail}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Detail
          </Link>

          <button
            onClick={handleAdd}
            style={{ ...s.btnCart, ...(added ? s.btnCartOk : {}) }}
          >
            {added ? (
              '✓ Added'
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Keranjang
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  card: {
    background: '#fff',
    border: '1px solid #E2DED6',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform .2s, box-shadow .2s',
  },
  imgArea: {
    height: 200,
    background: '#F5F3EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  catBadge: {
    position: 'absolute', top: 12, left: 12,
    fontSize: 10, fontWeight: 500,
    padding: '4px 10px', borderRadius: 99,
    background: '#F5EAE8', color: '#C9736A',
    border: '1px solid rgba(201,115,106,.3)',
    letterSpacing: '.04em',
  },
  img: { height: 140, objectFit: 'contain', transition: 'transform .4s' },
  body: {
    padding: '1rem 1.1rem 1.2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  catTxt: {
    fontSize: 10, letterSpacing: '.08em',
    color: '#A09A90', textTransform: 'uppercase', fontWeight: 500,
  },
  name: {
    fontFamily: "'Fraunces', serif",
    fontSize: 15, fontStyle: 'italic', fontWeight: 300,
    lineHeight: 1.45, color: '#0D0D0D',
    display: '-webkit-box', WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical', overflow: 'hidden',
    marginBottom: 2,
  },
  starsRow: { display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 },
  ratingCt: { fontSize: 11, color: '#A09A90', fontFamily: 'monospace', marginLeft: 2 },
  price: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22, letterSpacing: '.05em', color: '#0D0D0D',
    marginTop: 2,
  },

  // ✅ Garis pemisah
  divider: { height: 1, background: '#F0EDE7', margin: '10px 0 12px' },

  // ✅ Grid 2 kolom sama rata
  btnRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },

  btnDetail: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    padding: '9px 0',
    fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
    color: '#C9736A', background: 'transparent',
    border: '1.5px solid #C9736A', borderRadius: 10,
    textDecoration: 'none', cursor: 'pointer',
    transition: 'all .18s', letterSpacing: '.02em',
  },
  btnCart: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    padding: '9px 0',
    fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
    color: '#fff', background: '#C9736A',
    border: '1.5px solid #C9736A', borderRadius: 10,
    cursor: 'pointer', transition: 'all .18s', letterSpacing: '.02em',
  },
  btnCartOk: {
    background: '#3D7A72', borderColor: '#3D7A72',
  },
};