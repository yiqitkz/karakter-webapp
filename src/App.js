import React, { useState } from "react";

const characters = [
  {
    id: 1,
    name: "Aria",
    desc: "Yayıncı",
    img: "/aria.png"
  },
  {
    id: 2,
    name: "Mikasa",
    desc: "Yüksek Sınıf Escort",
    img: "/mikasa.png"
  },
  {
    id: 3,
    name: "Annie",
    desc: "Rock Star (Premium)",
    img: "/annie.png"
  }
];

function App() {
  const [selected, setSelected] = useState(null);
  const [sent, setSent] = useState(false);

  // Telegram WebApp API
  const tg = window.Telegram?.WebApp;

  const handleSelect = (char) => {
    setSelected(char.id);
    if (tg) {
      tg.sendData(JSON.stringify({ selected_char: char.id }));
      tg.close();
      setSent(true);
    } else {
      alert(`Seçilen karakter ID: ${char.id} (Telegram dışında testte bu uyarı çıkar)`);
    }
  };

  return (
    <div style={{ padding: 24, background: "#1d1d1d", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
      <h2>Karakterini Seç</h2>
      <div style={{ display: "flex", gap: 24 }}>
        {characters.map((char) => (
          <div key={char.id} style={{
            background: selected === char.id ? "#333" : "#222",
            border: selected === char.id ? "2px solid #53a9ff" : "2px solid #444",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            cursor: "pointer",
            width: 160
          }}
            onClick={() => handleSelect(char)}
          >
            <img
              src={char.img}
              alt={char.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: 12 }}
            />
            <h3 style={{ margin: 0 }}>{char.name}</h3>
            <p style={{ fontSize: 14, margin: "8px 0 0 0" }}>{char.desc}</p>
            {char.id === 3 && <div style={{ color: "#f5d742" }}>Premium</div>}
          </div>
        ))}
      </div>
      {sent && <p style={{color:"#8f8"}}>Karakter seçimin Telegram’a iletildi, pencereyi kapatabilirsin.</p>}
    </div>
  );
}

export default App;