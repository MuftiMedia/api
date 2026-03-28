# AI Summary API

API untuk generate rangkuman artikel ilmiah menggunakan AI. **Tidak memerlukan API key!**

## ✅ CORS Enabled

API ini sudah dikonfigurasi untuk menerima request dari domain manapun (CORS enabled).

## 🚀 Deploy ke Vercel

### Cara 1: Import dari GitHub
1. Upload folder ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com)
3. Klik "New Project" → Import repository
4. Klik "Deploy"

### Cara 2: Drag & Drop
1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop folder ini
3. Tunggu hingga selesai

## 📍 Endpoint

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/ai-summary` | Generate rangkuman artikel |
| GET | `/api/ai-summary` | Cek status API |

## 📝 Request Format

```javascript
fetch('https://your-app.vercel.app/api/ai-summary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Judul artikel',
    authors: 'Penulis (optional)',
    abstract: 'Abstract artikel'
  })
})
.then(res => res.json())
.then(data => console.log(data.summary))
```

## 📦 Response Format

```json
{
  "status": "ok",
  "summary": "Rangkuman artikel dalam bahasa Indonesia...",
  "title": "Judul artikel",
  "authors": "Penulis"
}
```

## 🔧 Integrasi dengan SmartCite Manager

Setelah deploy, update URL di JavaScript:

```javascript
const AI_SUMMARY_API_URL = 'https://your-app.vercel.app/api/ai-summary';
```

## ⚠️ Requirements

- Node.js 18+
- z-ai-web-dev-sdk (otomatis terinstall saat deploy)

## 📄 License

MIT License
