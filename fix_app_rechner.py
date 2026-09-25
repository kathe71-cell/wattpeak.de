with open("src/App.tsx", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    '<Route path="/rechner" element={<Navigate to="/ertragsrechner" replace />} />',
    '<Route path="/rechner" element={<ErtragsrechnerPage />} />'
)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Updated /rechner to render ErtragsrechnerPage directly.")
