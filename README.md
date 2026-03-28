# AI Summary API

API untuk menghasilkan rangkuman artikel ilmiah menggunakan AI.

## Deploy ke Vercel (Recommended)

### Cara 1: Deploy langsung dari GitHub

1. Upload folder ini ke repository GitHub Anda
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik "New Project" → Import repository Anda
4. Klik "Deploy"
5. Setelah deploy, Anda akan mendapat URL seperti: `https://nama-project.vercel.app`
6. Gunakan URL tersebut di JavaScript Anda:
   ```javascript
   const AI_SUMMARY_API_URL = 'https://nama-project.vercel.app/api/ai-summary';
   ```

### Cara 2: Deploy menggunakan Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Masuk ke folder ini
cd ai-summary-api

# Deploy
vercel

# Ikuti instruksi di layar
```

## Deploy ke Server Sendiri (Node.js/Bun)

```bash
# Install dependencies
npm install
# atau
bun install

# Jalankan development server
npm run dev
# atau
bun run dev

# Build untuk production
npm run build
npm start
```

## Penggunaan API

### Endpoint
```
POST /api/ai-summary
```

### Request Body
```json
{
  "title": "Judul Artikel",
  "authors": "Penulis",
  "abstract": "Abstract artikel..."
}
```

### Response
```json
{
  "status": "ok",
  "summary": "Rangkuman artikel dalam bahasa Indonesia...",
  "title": "Judul Artikel",
  "authors": "Penulis"
}
```

## Integrasi dengan SmartCite Manager

Ubah URL di JavaScript Anda:

```javascript
const AI_SUMMARY_API_URL = 'https://URL-ANDA/api/ai-summary';
```

Contoh:
```javascript
const AI_SUMMARY_API_URL = 'https://ai-summary-api.vercel.app/api/ai-summary';
```

## Catatan Penting

- **Tidak perlu API Key** - API ini menggunakan SDK internal
- **Gratis** - Tidak ada biaya tambahan
- **CORS Enabled** - Bisa diakses dari domain manapun
