import ZAI from "z-ai-web-dev-sdk";

// Initialize ZAI instance (reusable across requests)
let zaiInstance = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS preflight request
export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle GET request - API info
  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      message: "AI Summary API is running. Use POST method to generate summaries.",
      usage: {
        method: "POST",
        body: {
          title: "Article title (optional)",
          authors: "Authors list (optional)",
          abstract: "Article abstract text (recommended)"
        }
      },
      note: "No API key required - uses internal SDK"
    });
  }

  // Handle POST request - Generate summary
  if (req.method === "POST") {
    try {
      const { title, authors, abstract } = req.body;

      // Validate input
      if (!title && !abstract) {
        return res.status(400).json({
          status: "error",
          message: "Judul atau abstract harus diisi"
        });
      }

      // Get ZAI instance
      const zai = await getZAI();

      // Build prompt for summary generation
      const systemPrompt = `Anda adalah asisten akademik yang sangat ahli dalam membuat rangkuman artikel ilmiah yang jelas, ringkas, dan informatif.`;

      const userPrompt = `Buat rangkuman singkat dan jelas dari artikel ilmiah berikut ini dalam bahasa Indonesia:

Judul: ${title || "Tidak ada judul"}
${authors ? `Penulis: ${authors}\n` : ""}
${abstract ? `Abstract: ${abstract}\n` : ""}

Buat rangkuman yang mencakup:
1. Tujuan utama penelitian
2. Metodologi yang digunakan
3. Hasil Penelitian
4. Implikasi atau kesimpulan

Rangkuman harus dalam 4-5 paragraf yang ringkas namun informatif, jangan menggunakan kata berulang, buat parafrase yang bagus agar natural.`;

      // Call AI API
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        thinking: { type: "disabled" }
      });

      const summary = completion.choices?.[0]?.message?.content;

      if (!summary) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menghasilkan rangkuman - respons kosong dari AI"
        });
      }

      return res.status(200).json({
        status: "ok",
        summary: summary,
        title: title,
        authors: authors
      });

    } catch (error) {
      console.error("AI Summary Error:", error);

      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      return res.status(500).json({
        status: "error",
        message: `Gagal menghasilkan rangkuman: ${errorMessage}`
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    status: "error",
    message: "Method not allowed. Use GET or POST."
  });
}
