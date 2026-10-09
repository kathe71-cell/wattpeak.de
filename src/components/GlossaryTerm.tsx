import React from 'react';

export default function GlossaryTerm({ term, definition }: { term: string, definition: string }) {
  return (
    <span className="relative inline-block group cursor-help">
      <span className="border-b border-dashed border-amber-500 text-slate-900 font-semibold">{term}</span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-950 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <span className="font-bold text-amber-400 block mb-1">{term}</span>
        {definition}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950"></div>
      </div>
    </span>
  );
}
