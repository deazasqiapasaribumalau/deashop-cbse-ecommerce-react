// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const FREE_SHIP_THRESHOLD = 200;

export default function Cart() {
  const {
    items,
    totalPrice,
    removeItem,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const shipping = totalPrice >= FREE_SHIP_THRESHOLD ? 0 : 15.99;
  const grandTotal = totalPrice + shipping;
  const progress = Math.min(100, (totalPrice / FREE_SHIP_THRESHOLD) * 100);

  if (!items.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#888' }}>
        <p style={{ fontSize: 15, marginBottom: '1rem' }}>Keranjang kamu masih kosong.</p>
        <Link to="/" style={styles.checkoutBtn}>Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h2 style={styles.pageTitle}>Keranjang Belanja</h2>
          <span style={{ fontSize: 13, color: '#888' }}>{totalQty} item</span>
        </div>
        <button style={styles.clearBtn} onClick={clearCart}>Kosongkan</button>
      </div>

      {/* Layout 2 kolom */}
      <div style={styles.layout}>

        {/* Daftar Item */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {items.map((item) => (
            <div key={item.id} style={styles.cartItem}>

              {/* Gambar */}
              <div style={styles.imgBox}>
                <img src={item.image} alt={item.title}
                  style={{ width: 60, height: 60, objectFit: 'contain' }} />
              </div>

              {/* Info + Qty */}
              <div style={{ flex: 1 }}>
                <div style={styles.itemName}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
                  ${item.price.toFixed(2)} / pcs
                </div>

                {/* Tombol + dan - */}
                <div style={styles.qtyCtrl}>
                  <button style={styles.qb} onClick={() => decreaseQty(item.id)}>−</button>
                  <span style={styles.qv}>{item.quantity}</span>
                  <button style={styles.qb} onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              {/* Harga total + hapus */}
              <div style={styles.itemRight}>
                <span style={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                  Hapus
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={styles.summary}>
          <div style={styles.summaryTitle}>Ringkasan Pesanan</div>

          <div style={styles.summaryRow}>
            <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Ongkos Kirim</span>
            <span style={shipping === 0 ? { color: '#16A34A', fontWeight: 500 } : {}}>
              {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Progress bar gratis ongkir */}
          {shipping > 0 ? (
            <>
              <div style={styles.shipBarWrap}>
                <div style={{ ...styles.shipBar, width: `${progress}%` }} />
              </div>
              <p style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
                Tambah ${(FREE_SHIP_THRESHOLD - totalPrice).toFixed(2)} lagi untuk gratis ongkir
              </p>
            </>
          ) : (
            <p style={{ fontSize: 12, color: '#16A34A', padding: '6px 0' }}>
              ✓ Kamu dapat gratis ongkir!
            </p>
          )}

          <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
            <span>Total</span><span>${grandTotal.toFixed(2)}</span>
          </div>

          <button style={styles.checkoutBtn}>
            Lanjut ke Pembayaran →
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 },
  clearBtn: { fontSize: 12, color: '#aaa', border: '0.5px solid #E8E6DF', background: 'transparent', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' },
  cartItem: { display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '1rem', alignItems: 'center', background: '#fff', border: '0.5px solid #E8E6DF', borderRadius: 14, padding: '1rem 1.1rem' },
  imgBox: { width: 80, height: 80, background: '#F5F4F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  itemName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, lineHeight: 1.4, marginBottom: 3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  qtyCtrl: { display: 'inline-flex', alignItems: 'center', border: '0.5px solid #E8E6DF', borderRadius: 8, overflow: 'hidden', background: '#FAFAF8' },
  qb: { width: 30, height: 30, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qv: { width: 32, textAlign: 'center', fontSize: 14, fontWeight: 500, borderLeft: '0.5px solid #E8E6DF', borderRight: '0.5px solid #E8E6DF', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  itemRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, minWidth: 80 },
  itemTotal: { fontSize: 16, fontWeight: 500, letterSpacing: '-.02em' },
  removeBtn: { fontSize: 11, color: '#ccc', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 },
  summary: { background: '#fff', border: '0.5px solid #E8E6DF', borderRadius: 14, padding: '1.25rem', position: 'sticky', top: '1rem' },
  summaryTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, marginBottom: '1rem' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '7px 0', color: '#888' },
  summaryTotal: { borderTop: '0.5px solid #E8E6DF', marginTop: 8, paddingTop: 14, fontWeight: 500, fontSize: 16, color: '#1C1C1A' },
  shipBarWrap: { height: 4, background: '#E8E6DF', borderRadius: 99, margin: '4px 0 4px', overflow: 'hidden' },
  shipBar: { height: '100%', background: '#16A34A', borderRadius: 99, transition: 'width .4s' },
  checkoutBtn: { display: 'block', width: '100%', marginTop: '1rem', padding: 13, background: '#2D5016', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' },
};