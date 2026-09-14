import React, { useState } from 'react';
import { X, FolderHeart, Trash2, ArrowRight, Copy, Check, ShieldCheck, Plus } from 'lucide-react';
import { SavedProject, loadSavedProjects, saveProjectLocally, deleteSavedProject, encodeProjectToQuery } from '../utils/shareUtils';
import { SolarParams } from '../utils/solarMath';

interface SavedProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentParams: SolarParams;
  onLoadProject: (params: SolarParams, name?: string) => void;
}

export default function SavedProjectsDrawer({
  isOpen,
  onClose,
  currentParams,
  onLoadProject
}: SavedProjectsDrawerProps) {
  const [projects, setProjects] = useState<SavedProject[]>(() => loadSavedProjects());
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [newProjectName, setNewProjectName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setProjects(loadSavedProjects());
    }
  }

  if (!isOpen) return null;

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProjectName.trim() || `Solar-Projekt ${projects.length + 1}`;
    const saved = saveProjectLocally({
      name,
      systemType: currentParams.systemType || 'rooftop',
      params: currentParams
    });
    setProjects(prev => [saved, ...prev]);
    setNewProjectName('');
  };

  const handleDelete = (id: string) => {
    deleteSavedProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleCopyLink = (p: SavedProject) => {
    const query = encodeProjectToQuery(p.params, p.name);
    const fullUrl = `${window.location.origin}/ertragsrechner?p=${query}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <FolderHeart className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-black text-base">Mein Solarprojekt</h3>
              <span className="text-[11px] font-mono text-slate-400">Lokal gespeicherte Szenarien</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Quick Save Form */}
          <form onSubmit={handleSaveCurrent} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Aktuelle Konfiguration merken:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder={`z. B. ${currentParams.kwp} kWp mit ${currentParams.storageKwh} kWh Speicher`}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-xl transition shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Speichern</span>
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Merkt {currentParams.kwp} kWp, {currentParams.storageKwh} kWh Speicher, {currentParams.annualConsumption} kWh Verbrauch.
            </div>
          </form>

          {/* List of Saved Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Gespeicherte Varianten ({projects.length})
            </h4>

            {projects.length === 0 ? (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                <FolderHeart className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700 text-xs">Noch keine Projekte gespeichert</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Speichern Sie oben Ihre aktuelle Konfiguration, um verschiedene Anlagengrößen oder Speicher-Optionen zu vergleichen.
                </p>
              </div>
            ) : (
              projects.map((p) => (
                <div 
                  key={p.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-extrabold text-slate-950 text-sm">{p.name}</h5>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(p.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition cursor-pointer"
                      title="Projekt löschen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Leistung</span>
                      <strong className="text-slate-900">{p.params.kwp} kWp</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Speicher</span>
                      <strong className="text-slate-900">{p.params.storageKwh} kWh</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Verbrauch</span>
                      <strong className="text-slate-900">{p.params.annualConsumption} kWh</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadProject(p.params, p.name);
                        onClose();
                      }}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>In Rechner laden</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(p)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs p-2 rounded-xl transition flex items-center gap-1 cursor-pointer shrink-0"
                      title="Link kopieren"
                    >
                      {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Privacy Note Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 font-mono flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>100 % lokaler Speicher:</strong> Alle Entwürfe verbleiben ausschließlich in Ihrem Browser-Speicher (LocalStorage). Keine Cookies, keine Cloud-Übertragung, kein Konto.
          </p>
        </div>

      </div>
    </div>
  );
}
