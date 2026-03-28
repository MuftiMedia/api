import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// Initialize ZAI instance (reusable across requests)
let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// CORS headers - MUST be included in ALL responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With',
};

// Handle OPTIONS preflight request - REQUIRED FOR CORS
export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200, 
    headers: corsHeaders 
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, authors, abstract } = body;

    // Validate input
    if (!title && !abstract) {
      return NextResponse.json(
        { 
          status: "error", 
          message: "Judul atau abstract harus diisi" 
        },
        { status: 400, headers: corsHeaders }
      );
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
      return NextResponse.json(
        { 
          status: "error", 
          message: "Gagal menghasilkan rangkuman - respons kosong dari AI" 
        },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({
      status: "ok",
      summary: summary,
      title: title,
      authors: authors
    }, { headers: corsHeaders });

  } catch (error: unknown) {
    console.error("AI Summary Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        status: "error", 
        message: `Gagal menghasilkan rangkuman: ${errorMessage}` 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json({
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
    note: "No API key required - uses internal SDK",
    cors: "enabled - all origins allowed"
  }, { headers: corsHeaders });
}
