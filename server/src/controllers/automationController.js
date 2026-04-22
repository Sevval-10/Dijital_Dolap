export async function handleN8nWebhook(req, res, next) {
  try {
    const incomingSecret = req.headers["x-n8n-secret"];

    if (incomingSecret !== process.env.N8N_SHARED_SECRET) {
      return res.status(401).json({ message: "Yetkisiz webhook çağrısı." });
    }

    res.json({
      message: "Webhook başarıyla alındı.",
      receivedAt: new Date().toISOString(),
      payload: req.body
    });
  } catch (error) {
    next(error);
  }
}
