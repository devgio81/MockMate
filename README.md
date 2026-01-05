### MockMate MCP (`/mockmate-mcp`) 🔥

**MockMate** ist ein innovativer MCP-Server (Model Context Protocol), der Frontend-Entwicklern ermöglicht, Mock-APIs in Sekunden zu generieren – direkt aus ihrem KI-Editor heraus!

#### Features
- ⚡ **Instant Mock-APIs** - Keine Backend-Setup nötig
- 🤖 **KI-gestützte Datengenerierung** - Realistische Testdaten
- 🔗 **Unique API-Endpoints** - Jede Mock-API erhält eine eigene URL
- 🛠️ **Editor-Integration** - Funktioniert mit Cursor AI, Cline, VS Code & GitHub Copilot
- 💯 **100% Kostenlos** - Keine Limits, keine versteckten Kosten

#### Mehr erfahren
- 📖 **[MockMate Landing Page](https://tomczak.dev/mockmate-mcp)** - Vollständige Dokumentation & Installation
- 🐙 **[MockMate GitHub Repository](https://github.com/devgio81/MockMate)** - Source Code & Setup

#### Quick Installation

```bash
# MockMate Repository klonen
git clone https://github.com/devgio81/MockMate.git
cd MockMate

# MCP-Konfiguration hinzufügen (Cursor AI / Cline)
# ~/.cursor/mcp.json oder Cline Settings:
{
  "mcpServers": {
    "mockmate": {
      "command": "node",
      "args": [
        "/pfad/zu/MockMate/index.js",
        "https://n8n.tomczak.dev/webhook/mcp"
      ]
    }
  }
}
```

Mehr Details auf der **[MockMate Landing Page](https://tomczak.dev/mockmate-mcp)**.

---

## 🚢 Deployment

### Vercel (Empfohlen)

Die einfachste Methode ist das Deployment auf [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/devgio81/tomczak-redesign)

1. Pushe dein Repository zu GitHub
2. Importiere das Projekt in Vercel
3. Konfiguriere Umgebungsvariablen
4. Deploy! 🚀

### Andere Plattformen

Das Projekt kann auch auf anderen Plattformen deployed werden:
- **Netlify** - Next.js Support mit Adapter
- **AWS Amplify** - Full Stack Deployment
- **Cloudflare Pages** - Edge Deployment
- **Docker** - Self-hosted mit Container

---

## 📝 Content Management

### Blog-Posts hinzufügen

Blog-Inhalte werden in `src/lib/data.ts` verwaltet. Füge neue Posts zum `blogPosts`-Array hinzu:

```typescript
{
  slug: 'mein-neuer-post',
  title: 'Mein neuer Blog-Post',
  excerpt: 'Eine kurze Zusammenfassung...',
  content: `
    # Überschrift
    
    Dein Markdown-Content hier...
  `,
  image: '/images/post.jpg',
  date: '2026-01-05',
  author: 'Martin Tomczak',
  readTime: '8 min',
  tags: ['Next.js', 'React', 'TypeScript']
}
```

### Services verwalten

Services werden ebenfalls in `src/lib/data.ts` definiert:

```typescript
{
  slug: 'neuer-service',
  title: 'Neuer Service',
  description: 'Service-Beschreibung...',
  icon: <YourIcon />,
  // ... weitere Felder
}
```

---

## 🎨 Customization

### Farben anpassen

Farben werden in `src/app/globals.css` über CSS-Variablen definiert:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 220 100% 50%;
  /* ... weitere Farben */
}
```

### Komponenten anpassen

Alle UI-Komponenten befinden sich in `src/components/`. Die meisten nutzen CVA für Variants:

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        outline: "...",
      }
    }
  }
)
```

---

## 🧪 Testing & Quality

```bash
# Linting
npm run lint

# Type-Checking
npx tsc --noEmit

# Build-Test
npm run build
```

---

## 📊 Performance

- ⚡ **Lighthouse Score:** 100/100/100/100
- 🎯 **First Contentful Paint:** < 1s
- 🚀 **Time to Interactive:** < 2s
- 📦 **Bundle Size:** Optimiert durch Next.js Code Splitting
- 🔄 **React Compiler:** Automatische Performance-Optimierung

---

## 🤝 Contributing

Contributions sind willkommen! Bitte:

1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

## 📬 Kontakt

**Martin Tomczak**  
Senior Full Stack Architect & AI Engineer

- 🌐 Website: [tomczak.dev](https://tomczak.dev)
- 📧 E-Mail: [freelancer@tomczak.dev](mailto:freelancer@tomczak.dev)
- 💼 LinkedIn: [Martin Tomczak](https://linkedin.com/in/martintomczak)
- 🐙 GitHub: [@devgio81](https://github.com/devgio81)

---

## 📄 Lizenz

Dieses Projekt ist proprietär und urheberrechtlich geschützt.  
© 2026 Martin Tomczak. Alle Rechte vorbehalten.

---

## 🙏 Danksagungen

- [Next.js Team](https://nextjs.org/) für das großartige Framework
- [Tailwind Labs](https://tailwindcss.com/) für Tailwind CSS
- [Supabase](https://supabase.com/) für die Backend-Infrastruktur

---

## 🔗 Links

- 📖 [MockMate MCP Landing Page](https://tomczak.dev/mockmate-mcp)
- 🐙 [MockMate GitHub Repository](https://github.com/devgio81/MockMate)
- 📝 [Blog](https://tomczak.dev/blog)
- 💼 [Services](https://tomczak.dev/services)
- 📧 [Kontakt](https://tomczak.dev/contact)

---
