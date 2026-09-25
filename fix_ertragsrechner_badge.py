with open("src/pages/ErtragsrechnerPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    "Physikalisches Näherungsmodell · DIN EN IEC 60904-3",
    "Physikalisches Näherungsmodell · DWD / PVGIS Einstrahlungsdaten"
)

with open("src/pages/ErtragsrechnerPage.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Updated ErtragsrechnerPage badge")
