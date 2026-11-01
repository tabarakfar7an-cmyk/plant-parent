Plant Parent - deploy notes
===========================
Upload the whole folder (just index.html) to any static host:
  - Netlify: drag the folder onto app.netlify.com/drop
  - Cloudflare Pages / Vercel / GitHub Pages: point at this folder
  - Any web host: put index.html in public_html

What works on your own host
  - Arabic / English, 245 plants with common alternative names, 3D-style renders + real photos fetched from Wikipedia (needs internet), climate-based schedules, add / water / feed.
  - Plants are saved in each visitor's browser (localStorage), on that device only.

What needs Claude (works only on the claude.ai artifact link)
  - Account sync across devices.
  - Leaf photo analysis. On your own host the Leaf doctor still works from ticked symptoms.

To get sync and photo analysis on your own domain you need a backend:
  - Sync: a database with sign-in (Firebase, Supabase) replacing saveLocal/pushCloud in the script.
  - Photo analysis: a server route that calls the Claude API with the key kept on the server.
Fonts load from Google Fonts, so the host needs internet access for visitors.
