const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "İstek başarısız oldu" }));
    throw new Error(error.message || "İstek başarısız oldu");
  }

  return response.json();
}

export function fetchSummary() {
  return request("/dashboard/summary");
}

export function fetchClothes() {
  return request("/clothes");
}

export function fetchRecommendation(occasion) {
  return request(`/outfits/recommendation?occasion=${encodeURIComponent(occasion)}`);
}

export function createClothingItem(payload) {
  return request("/clothes", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function deleteClothingItem(id) {
  return request(`/clothes/${id}`, {
    method: "DELETE"
  });
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/clothes/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Görsel yükleme başarısız oldu" }));
    throw new Error(error.message || "Görsel yükleme başarısız oldu");
  }

  return response.json();
}
