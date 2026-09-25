import re

# 1. Update index.html description
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

idx = re.sub(
    r'Berechnung nach DIN EN IEC 60904-3',
    'Berechnung auf Basis regionaler Einstrahlungsdaten',
    idx
)
idx = re.sub(
    r'DIN EN IEC 60904-3',
    'PVGIS & DWD Einstrahlungswerte',
    idx
)
with open("index.html", "w", encoding="utf-8") as f:
    f.write(idx)

print("Updated index.html")
