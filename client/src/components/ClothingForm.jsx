import { useState } from "react";

const initialForm = {
  name: "",
  category: "Top",
  color: "White",
  season: "Spring",
  occasion: "Casual",
  tags: ""
};

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

export default function ClothingForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(form, imageFile);
    setForm(initialForm);
    setImageFile(null);
    event.target.reset();
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel__header">
        <p className="eyebrow">Dolap Girişi</p>
        <h2>Yeni bir kıyafet ekle</h2>
      </div>

      <label>
        Ürün adı
        <input name="name" value={form.name} onChange={handleChange} placeholder="Beyaz Gömlek" required />
      </label>

      <div className="grid-2">
        <label>
          Kategori
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Top">{categoryMap.Top}</option>
            <option value="Bottom">{categoryMap.Bottom}</option>
            <option value="Outerwear">{categoryMap.Outerwear}</option>
            <option value="Shoes">{categoryMap.Shoes}</option>
            <option value="Accessory">{categoryMap.Accessory}</option>
          </select>
        </label>

        <label>
          Renk
          <select name="color" value={form.color} onChange={handleChange}>
            <option value="White">{colorMap.White}</option>
            <option value="Black">{colorMap.Black}</option>
            <option value="Blue">{colorMap.Blue}</option>
            <option value="Beige">{colorMap.Beige}</option>
            <option value="Green">{colorMap.Green}</option>
            <option value="Gray">{colorMap.Gray}</option>
            <option value="Brown">{colorMap.Brown}</option>
          </select>
        </label>
      </div>

      <div className="grid-2">
        <label>
          Mevsim
          <select name="season" value={form.season} onChange={handleChange}>
            <option value="Spring">{seasonMap.Spring}</option>
            <option value="Summer">{seasonMap.Summer}</option>
            <option value="Autumn">{seasonMap.Autumn}</option>
            <option value="Winter">{seasonMap.Winter}</option>
            <option value="All Season">{seasonMap["All Season"]}</option>
          </select>
        </label>

        <label>
          Kullanım Amacı
          <select name="occasion" value={form.occasion} onChange={handleChange}>
            <option value="Casual">{occasionMap.Casual}</option>
            <option value="Office">{occasionMap.Office}</option>
            <option value="Sport">{occasionMap.Sport}</option>
            <option value="Event">{occasionMap.Event}</option>
          </select>
        </label>
      </div>

      <label>
        Etiketler
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="minimal, günlük, sade" />
      </label>

      <label>
        Görsel
        <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
      </label>

      <button type="submit">Ürünü Kaydet</button>
    </form>
  );
}
