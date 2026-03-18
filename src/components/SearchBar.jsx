// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={{ padding: '1.25rem 1.75rem .75rem' }}>
      <div style={s.box}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="#bbb" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cari produk favoritmu..."
          style={s.input}
        />
        {query && (
          <button onClick={handleClear} style={s.clear}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

const s = {
  box: { display:'flex', alignItems:'center', gap:10, background:'#fff', border:'1px solid #D8D4CB', borderRadius:10, padding:'0 14px', boxShadow:'0 1px 4px rgba(0,0,0,.05)', transition:'border-color .2s' },
  input: { flex:1, border:'none', outline:'none', fontFamily:"'DM Sans', sans-serif", fontSize:14, padding:'11px 0', background:'transparent', color:'#0D0D0D' },
  clear: { border:'none', background:'transparent', color:'#ccc', cursor:'pointer', display:'flex', alignItems:'center', padding:'0 2px' },
};