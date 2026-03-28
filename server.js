/**
 * AI Summary API - Standalone Server
 *
 * Jalankan dengan: bun run server.js
 * atau: node server.js
 *
 * Port default: 3001 (ubah via environment variable PORT)
 */

const ZAI = require("z-ai-web-dev-sdk").default;

let zaiInstance = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

const PORT = process.env.PORT || 3001;

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle OPTIONS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    // Handle GET - API info
    if (req.method === "GET" && url.pathname === "/api/ai-summary") {
      return Response.json(
        {
          status: "ok",
          message: "AI Summary API is running. Use POST method to generate summaries.",
          usage: {
            method: "POST",
            endpoint: "/api/ai-summary",
            body: {
              title: "Article title (optional)",
              authors: "Authors list (optional)",
              abstract: "Article abstract text (recommended)"
            }
          },
          note: "No API key required - uses internal SDK"
        },
        { headers: corsHeaders }
      );
    }

    // Handle POST - Generate summary
    if (req.method === "POST" && url.pathname === "/api/ai-summary") {
      try {
        const body = await req.json();
        const { title, authors, abstract } = body;

        // Validate input
        if (!title && !abstract) {
          return Response.json(
            {
              status: "error",
              message: "Judul atau abstract harus diisi"
            },
            { status: 400, headers: corsHeaders }
          );
        }

        // Get ZAI instance
        const zai = await getZAI();

        // Build prompt
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
          return Response.json(
            {
              status: "error",
              message: "Gagal menghasilkan rangkuman - respons kosong dari AI"
            },
            { status: 500, headers: corsHeaders }
          );
        }

        return Response.json(
          {
            status: "ok",
            summary: summary,
            title: title,
            authors: authors
          },
          { headers: corsHeaders }
        );

      } catch (error) {
        console.error("AI Summary Error:", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        return Response.json(
          {
            status: "error",
            message: `Gagal menghasilkan rangkuman: ${errorMessage}`
          },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // 404 for other routes
    return Response.json(
      {
        status: "error",
        message: "Not found. Use POST /api/ai-summary"
      },
      { status: 404, headers: corsHeaders }
    );
  },
});

console.log(`🚀 AI Summary API running on http://localhost:${PORT}`);
console.log(`📍 Endpoint: POST http://localhost:${PORT}/api/ai-summary`);
console.log(`📖 Docs: GET http://localhost:${PORT}/api/ai-summary`);
