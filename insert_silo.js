const fs = require('fs');
let code = fs.readFileSync('src/components/Calculator.tsx', 'utf8');

const bannerHtml = `
            {/* Silo-Structure Contextual Hardware Link */}
            {systemType === 'balcony' && (
              <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-300 flex items-center justify-between gap-4 group">
                <div>
                  <h5 className="text-sm font-black text-amber-950">Passendes 800W-Set gesucht?</h5>
                  <p className="text-xs text-amber-800 mt-1">Vergleiche 800W Komplettsets und Speicher, die genau zu diesem Ertrag passen.</p>
                </div>
                <Link to="/hardware-katalog" className="shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-4 py-2 rounded-xl text-xs transition">
                  Zum Hardware-Katalog →
                </Link>
              </div>
            )}
            {systemType === 'rooftop' && (
              <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 group">
                <div>
                  <h5 className="text-sm font-black text-white">Dachanlage konfigurieren?</h5>
                  <p className="text-xs text-slate-400 mt-1">Finde die passenden Wechselrichter und Speicher für deine Hausanlage.</p>
                </div>
                <Link to="/hardware-katalog" className="shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-4 py-2 rounded-xl text-xs transition">
                  System-Hardware prüfen →
                </Link>
              </div>
            )}
`;

code = code.replace(
  /(\{\/\* Detailed Energy Flow Balance \(Closed Equations\) \*\/\})/,
  bannerHtml + '\n            $1'
);

// Ensure Link from react-router-dom is imported if not already. 
// Calculator.tsx probably doesn't have it imported, or it does. Let's check imports.
if (!code.includes('import { Link }')) {
  // It might just have import { Link } from 'react-router-dom';
  // Let's replace the react import block
  code = code.replace(/import React, \{([^\}]+)\} from 'react';/, "import React, { $1 } from 'react';\nimport { Link } from 'react-router-dom';");
}

fs.writeFileSync('src/components/Calculator.tsx', code);
console.log('Inserted silo banner.');
