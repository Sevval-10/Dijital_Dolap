import { useEffect, useState } from "react";
import { createClothingItem, deleteClothingItem, fetchClothes, fetchRecommendation, fetchSummary, uploadImage } from "./api";
import ClothingForm from "./components/ClothingForm.jsx";
import ClosetList from "./components/ClosetList.jsx";
import RecommendationPanel from "./components/RecommendationPanel.jsx";
import StatCard from "./components/StatCard.jsx";

const seasonMap = {
  Spring: "İlkbahar",
  Summer: "Yaz",
  Autumn: "Sonbahar",
  Winter: "Kış",
  "All Season": "Tüm Mevsim"
};

export default function App() {
  const [summary, setSummary] = useState(null);
  const [items, setItems] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [occasion, setOccasion] = useState("Casual");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData(selectedOccasion = occasion) {
    try {
      setLoading(true);
      setError("");
      const [summaryData, clothesData, recommendationData] = await Promise.all([
        fetchSummary(),
        fetchClothes(),
        fetchRecommendation(selectedOccasion)
      ]);
      setSummary(summaryData);
      setItems(clothesData);
      setRecommendation(recommendationData);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddItem(form, imageFile) {
    try {
      let imageUrl = "";

      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        imageUrl = uploaded.imageUrl;
      }

      await createClothingItem({ ...form, imageUrl });
      await loadData();
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  async function handleOccasionChange(nextOccasion) {
    setOccasion(nextOccasion);
    await loadData(nextOccasion);
  }

  async function handleDeleteItem(id) {
    try {
      setError("");
      await deleteClothingItem(id);
      await loadData();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Dijital Dolap Platformu</p>
          <h1>Gardırobunu yönet, hava durumuna uygun kombin önerileri al.</h1>
          <p className="hero__copy">
            Bu MVP; React, Express, PostgreSQL, Multer, Docker, n8n ve Gemini AI teknolojilerini
            tek bir proje yapısında birleştirir.
          </p>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

      {loading ? (
        <div className="panel">Uygulama verileri yükleniyor...</div>
      ) : (
        <>
          <section className="stats-grid">
            <StatCard label="Toplam Ürün" value={summary?.totalItems || 0} accent="linear-gradient(135deg, #d95d39, #f2c078)" />
            <StatCard
              label="Ana Mevsim"
              value={seasonMap[summary?.currentSeason] || "Yok"}
              accent="linear-gradient(135deg, #386641, #6a994e)"
            />
            <StatCard
              label="Güncel Sıcaklık"
              value={`${summary?.weather?.temperature || 0} C`}
              accent="linear-gradient(135deg, #3d5a80, #98c1d9)"
            />
          </section>

          <main className="content-grid">
            <div className="content-grid__left">
              <RecommendationPanel
                recommendation={recommendation}
                occasion={occasion}
                onOccasionChange={handleOccasionChange}
                onRefresh={() => loadData(occasion)}
              />
              <ClosetList items={items} onDelete={handleDeleteItem} />
            </div>

            <div className="content-grid__right">
              <ClothingForm onSubmit={handleAddItem} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
