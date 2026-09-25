import re

# Update App.tsx
with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

if 'path="/rechner"' not in app_code:
    app_code = app_code.replace(
        '<Route path="/ertragsrechner" element={<ErtragsrechnerPage />} />',
        '<Route path="/ertragsrechner" element={<ErtragsrechnerPage />} />\n        <Route path="/rechner" element={<ErtragsrechnerPage />} />'
    )
    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.write(app_code)
    print("Added /rechner to App.tsx")

# Update prerender.js
with open("prerender.js", "r", encoding="utf-8") as f:
    pre_code = f.read()

if "'/rechner':" not in pre_code:
    insert_point = "  '/ertragsrechner': {"
    hub_entry = """  '/rechner': {
    title: 'PV-Rechner Übersicht: Ertrag, Balkonkraftwerk & Speicher · Wattpeak | wattpeak.de',
    description: 'Alle Photovoltaik-Rechner im Überblick: PV-Ertragsrechner, Balkonkraftwerk 800W Simulator, Speicherauslegung und Wirtschaftlichkeitsberechnung.',
  },
"""
    pre_code = pre_code.replace(insert_point, hub_entry + insert_point)
    with open("prerender.js", "w", encoding="utf-8") as f:
        f.write(pre_code)
    print("Added /rechner to prerender.js")

# Update sitemap.xml
with open("public/sitemap.xml", "r", encoding="utf-8") as f:
    sitemap = f.read()

if "https://wattpeak.de/rechner" not in sitemap:
    sitemap = sitemap.replace(
        "<loc>https://wattpeak.de/ertragsrechner</loc>",
        "<loc>https://wattpeak.de/rechner</loc>\n    <lastmod>2026-09-25</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>https://wattpeak.de/ertragsrechner</loc>"
    )
    with open("public/sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)
    print("Added /rechner to sitemap.xml")

