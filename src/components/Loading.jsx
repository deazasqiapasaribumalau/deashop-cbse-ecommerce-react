// src/components/Loading.jsx
export default function Loading() {
  return (
    <div style={{ textAlign:'center', padding:'4rem 2rem' }}>
      <div style={{
        width:36, height:36, margin:'0 auto',
        border:'3px solid #EAE7E0',
        borderTop:'3px solid #C9736A',
        borderRadius:'50%',
        animation:'spin 0.9s linear infinite',
      }}/>
      <p style={{ marginTop:'1rem', color:'#A09A90', fontSize:13, fontFamily:"'DM Sans', sans-serif" }}>
        Memuat produk...
      </p>
    </div>
  );
}