const categoryMap = {
  Top: "Üst",
  Bottom: "Alt",
  Outerwear: "Dış Giyim",
  Shoes: "Ayakkabı",
  Accessory: "Aksesuar"
};

const colorMap = {
  White: "Beyaz",
  Black: "Siyah",
  Blue: "Mavi",
  Beige: "Bej",
  Green: "Yeşil",
  Gray: "Gri",
  Brown: "Kahverengi"
};

const seasonMap = {
  Spring: "İlkbahar",
  Summer: "Yaz",
  Autumn: "Sonbahar",
  Winter: "Kış",
  "All Season": "Tüm Mevsim"
};

const occasionMap = {
  Casual: "Günlük",
  Office: "Ofis",
  Sport: "Spor",
  Event: "Etkinlik"
};

export default function ClosetList({ items, onDelete }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <p className="eyebrow">Gardırop</p>
        <h2>Kıyafet envanteri</h2>
      </div>

      <div className="closet-list">
        {items.map((item) => (
          <article key={item.id} className="closet-item">
            <div className="closet-item__media">
              {item.image_url ? (
                <img src={`http://localhost:5000${item.image_url}`} alt={item.name} />
              ) : (
                <span>{item.color.slice(0, 1)}</span>
              )}
            </div>
            <div className="closet-item__content">
              <div>
                <strong>{item.name}</strong>
                <p>
                  {categoryMap[item.category] || item.category} • {colorMap[item.color] || item.color} • {seasonMap[item.season] || item.season}
                </p>
                <small>{occasionMap[item.occasion] || item.occasion}</small>
              </div>
              <button
                type="button"
                className="closet-item__delete"
                onClick={() => onDelete(item.id)}
              >
                Sil
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
