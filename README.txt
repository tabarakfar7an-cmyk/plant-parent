Plant Parent - deploy notes (GitHub Pages)
==========================================
1. Put index.html at the root of your repo (or in /docs).
2. Repo Settings > Pages > Deploy from a branch > pick the branch and folder > Save.
3. Open https://<user>.github.io/<repo>/

What works
  - Arabic / English, 347 plants with common alternative names, climate-based schedules, add / water / feed.
  - Real plant photos: each species has an exact English Wikipedia article title (WT list in the script).
    Photos are fetched in the visitor's browser in batches of up to 50 titles per request,
    only for what is on screen, and cached in localStorage (key pp-img-v2).
    If an article has no lead photo, the 3D-style render stays as the fallback.
  - Plants are saved in each visitor's browser (localStorage), on that device only.

Photo credits
  - Photos come from Wikipedia / Wikimedia Commons (CC BY-SA or public domain).
    A credit line is in the footer; hovering a photo shows its source.

Fixing a wrong or missing photo
  - Open index.html, find const WT={...} and change the title for that plant id,
    e.g. rose:'Rosa × damascena'. Use the exact title of the English Wikipedia article.

Not available on a static host
  - Account sync across devices and leaf photo analysis (these need Claude / a backend).
    The Leaf doctor still works from ticked symptoms.

Live weather (new)
  - Weather comes from Open-Meteo (no key). It uses the visitor's location (browser permission) or the chosen city,
    refreshes daily (and hourly while open), and shows a 5-day forecast. Tap a day for tips.
  - "Auto" condition now follows the weather (rain skips outdoor watering, heat/cold/dry-wind change the pace).
    Picking a condition manually still overrides it for that day.

Care reminders (new)
  - Files needed next to index.html: sw.js, manifest.json, icon.svg.
  - Notifications: one per day at the chosen time when watering/feeding is due. They fire while the site is open,
    or when installed as an app (Chrome/Edge/Android; iPhone needs Add to Home Screen first, iOS 16.4+).
  - A static site cannot push to a closed browser. For alerts that always fire use "Add to calendar" (.ics),
    which creates repeating events with alarms for every plant.
  - Reminder settings are stored per device (localStorage).
