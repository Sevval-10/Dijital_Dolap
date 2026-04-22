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

export default function RecommendationPanel({ recommendation, occasion, onOccasionChange, onRefresh }) {
  const weather = recommendation?.context?.weather;

  return (
    <section className="panel">
      <div className="panel__header panel__header--spread">
        <div>
          <p className="eyebrow">YZ Stil Desteği</p>
          <h2>Akıllı kombin önerisi</h2>
        </div>

        <div className="recommendation-actions">
          <select value={occasion} onChange={(event) => onOccasionChange(event.target.value)}>
            <option value="Casual">{occasionMap.Casual}</option>
            <option value="Office">{occasionMap.Office}</option>
            <option value="Sport">{occasionMap.Sport}</option>
            <option value="Event">{occasionMap.Event}</option>
          </select>
          <button type="button" onClick={onRefresh}>
            Yenile
          </button>
        </div>
      </div>

      {recommendation ? (
        <>
          <div className="weather-chip">
            <span>{seasonMap[recommendation.context.season] || recommendation.context.season}</span>
            <span>{weather?.temperature} C</span>
          </div>

          <div className="outfit-grid">
            {recommendation.outfit.map((item) => (
              <article className="outfit-card" key={item.id}>
                <p>{categoryMap[item.category] || item.category}</p>
                <strong>{item.name}</strong>
                <span>
                  {colorMap[item.color] || item.color} • {occasionMap[item.occasion] || item.occasion}
                </span>
              </article>
            ))}
          </div>

          <div className="ai-note">
            <h3>Gemini özeti</h3>
            <p>{recommendation.ai?.summary}</p>
            {!!recommendation.ai?.bullets?.length && (
              <ul>
                {recommendation.ai.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p>Henüz bir kombin önerisi yüklenmedi.</p>
      )}
    </section>
  );
}
