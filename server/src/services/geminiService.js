import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

export async function generateGeminiRecommendation(payload) {
  if (!env.geminiApiKey) {
    return {
      summary:
        "Gemini API anahtarı tanımlı değil. Bu nedenle kural tabanlı öneri kullanıldı.",
      bullets: [
        "Yapay zeka açıklamalarını açmak için GEMINI_API_KEY değerini ekleyin.",
        "Mevcut kombin; kategori, mevsim, kullanım amacı ve renk uyumuna göre oluşturuldu."
      ]
    };
  }

  const client = new GoogleGenerativeAI(env.geminiApiKey);
  const model = client.getGenerativeModel({ model: env.geminiModel });

  const prompt = `
Sen bir stil danışmanısın.
"summary" ve "bullets" anahtarlarına sahip kısa bir JSON nesnesi döndür.
Kullanıcının gardırop ürünleri:
${JSON.stringify(payload.items, null, 2)}

Hava durumu:
${JSON.stringify(payload.weather, null, 2)}

Kullanım amacı:
${payload.occasion}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      summary: text,
      bullets: []
    };
  }
}
