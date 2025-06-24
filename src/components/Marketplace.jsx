import React, { useState } from 'react';

const businesses = [
  {
    name: "Priya's Embroidery House",
    category: 'Handicrafts & Art',
    categoryColor: '#a259ff',
    rating: 4.8,
    reviews: 23,
    description: 'Beautiful handmade embroidery work for sarees, dress materials, and home decor. Specializing in traditional designs.',
    location: 'Mysore Road, Bangalore, Karnataka',
    owner: 'Priya Sharma',
    phone: '#',
    whatsapp: '#',
    email: '#',
  },
  {
    name: "Kavitha's Organic Farm",
    category: 'Agriculture & Farming',
    categoryColor: '#3bb273',
    rating: 4.9,
    reviews: 45,
    description: 'Fresh organic vegetables, fruits, and dairy products directly from our farm. Home delivery available.',
    location: 'Coimbatore District, Tamil Nadu',
    owner: 'Kavitha Reddy',
    phone: '#',
    whatsapp: '#',
    email: '#',
  },
  {
    name: "Meera's Handicrafts",
    category: 'Handicrafts & Art',
    categoryColor: '#a259ff',
    rating: 4.7,
    reviews: 18,
    description: 'Traditional Rajasthani handicrafts including pottery, jewelry, and textiles. Perfect for gifts and home decor.',
    location: 'Jaipur, Pink City, Rajasthan',
    owner: 'Meera Patel',
    phone: '#',
    whatsapp: '#',
    email: '#',
  },
  {
    name: "Sunita's Catering Services",
    category: 'Food & Catering',
    categoryColor: '#f24e1e',
    rating: 4.6,
    reviews: 15,
    description: 'Authentic Punjabi cuisine for weddings, parties, and corporate events. Specializing in traditional dishes.',
    location: 'Ludhiana, Punjab, Punjab',
    owner: 'Sunita Singh',
    phone: '#',
    whatsapp: '#',
    email: '#',
  },
];

const categories = [
  'All Categories',
  'Handicrafts & Art',
  'Agriculture & Farming',
  'Food & Catering',
];

const locations = [
  'All Locations',
  'Karnataka',
  'Tamil Nadu',
  'Rajasthan',
  'Punjab',
];

const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [location, setLocation] = useState('All Locations');

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || b.category === category;
    const matchesLocation = location === 'All Locations' || b.location.includes(location);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', marginBottom: 4 }}>Business Marketplace</h1>
        <p style={{ color: '#444', fontSize: 18, marginBottom: 32 }}>Discover and connect with women-owned businesses in your area</p>
        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 36, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search businesses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 2, minWidth: 220, fontSize: 17, borderRadius: 12, border: '1.5px solid #e0e0e0', padding: '16px 18px', background: '#fff', color: '#222', fontWeight: 500, outline: 'none' }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1, minWidth: 180, fontSize: 16, borderRadius: 12, border: '1.5px solid #e0e0e0', padding: '0 18px', background: '#fff', color: '#222', fontWeight: 500, height: 52 }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ flex: 1, minWidth: 180, fontSize: 16, borderRadius: 12, border: '1.5px solid #e0e0e0', padding: '0 18px', background: '#fff', color: '#222', fontWeight: 500, height: 52 }}>
            {locations.map(l => <option key={l}>{l}</option>)}
          </select>
          <button
            style={{ flex: 'none', minWidth: 160, fontSize: 16, borderRadius: 12, border: 'none', padding: '0 18px', background: 'linear-gradient(90deg, #a259c6 0%, #5d5fef 100%)', color: '#fff', fontWeight: 600, height: 52, cursor: 'pointer', boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }}
            onClick={() => alert('Add your business functionality coming soon!')}
          >
            + Add ur business
          </button>
        </div>
        {/* Business Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {filteredBusinesses.map((b, i) => (
            <div key={b.name} className="marketplace-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(162,89,255,0.08)', padding: '28px 24px', flex: '1 1 340px', minWidth: 320, maxWidth: 390, display: 'flex', flexDirection: 'column', gap: 10, transition: 'box-shadow 0.18s, transform 0.18s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 20 }}>{b.name}</span>
                <span style={{ color: '#ffc700', fontSize: 20, marginLeft: 6, display: 'flex', alignItems: 'center', gap: 2 }}>★ <span style={{ fontWeight: 600, fontSize: 17, color: '#444' }}>{b.rating}</span> <span style={{ color: '#888', fontSize: 15 }}>({b.reviews})</span></span>
              </div>
              <div style={{ color: b.categoryColor, fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{b.category}</div>
              <div style={{ color: '#444', fontSize: 16, marginBottom: 6 }}>{b.description}</div>
              <div style={{ color: '#666', fontSize: 15, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span role="img" aria-label="location">📍</span> {b.location}
              </div>
              <div style={{ color: '#666', fontSize: 15, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span role="img" aria-label="owner">👤</span> By {b.owner}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <a href={b.phone} className="marketplace-btn call" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'background 0.18s, transform 0.18s', display: 'flex', alignItems: 'center', gap: 6 }}>📞 Call</a>
                <a href={b.whatsapp} className="marketplace-btn whatsapp" style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'background 0.18s, transform 0.18s', display: 'flex', alignItems: 'center', gap: 6 }}>💬 WhatsApp</a>
                <a href={b.email} className="marketplace-btn email" style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'background 0.18s, transform 0.18s', display: 'flex', alignItems: 'center', gap: 6 }}>✉️ Email</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .marketplace-card:hover {
          box-shadow: 0 6px 24px rgba(162,89,255,0.16);
          transform: translateY(-4px) scale(1.025);
        }
        .marketplace-btn:hover {
          filter: brightness(0.93);
          transform: scale(1.06);
        }
        .marketplace-btn.call:hover {
          background: #16a34a;
        }
        .marketplace-btn.whatsapp:hover {
          background: #128c7e;
        }
        .marketplace-btn.email:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Marketplace; 