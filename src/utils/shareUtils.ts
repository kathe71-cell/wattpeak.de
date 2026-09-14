import { SolarParams } from './solarMath';

export interface SavedProject {
  id: string;
  name: string;
  createdAt: string;
  systemType: 'balcony' | 'rooftop' | 'retrofit_storage';
  params: SolarParams;
  customQuoteEur?: number;
  notes?: string;
}

const STORAGE_KEY = 'wattpeak_saved_projects_v1';

/**
 * Kodiert Projektparameter kompakt in einen URL-sicheren String für teilbare Links
 */
export function encodeProjectToQuery(params: SolarParams, name?: string): string {
  try {
    const payload = {
      n: name || '',
      t: params.systemType || 'rooftop',
      k: params.kwp,
      r: params.region,
      l: params.locationId || '',
      m: params.mountingType || 'pitched',
      ti: params.tilt,
      az: params.azimuth,
      c: params.cellType,
      d: params.annualConsumption,
      s: params.storageKwh,
      p: params.electricityPrice,
      f: params.feedInTariff,
      rem: params.feedInRemunerationType,
      inv: params.customInvestmentEur,
      op: params.operatingCostRatePercent,
    };
    const jsonStr = JSON.stringify(payload);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
  } catch (e) {
    console.error('Error encoding project to URL:', e);
    return '';
  }
}

/**
 * Dekodiert URL-Parameter sicher zurück in SolarParams
 */
export function decodeProjectFromQuery(searchStr: string): { params: Partial<SolarParams>; name?: string } | null {
  try {
    const urlParams = new URLSearchParams(searchStr);
    const pCode = urlParams.get('p');
    if (!pCode) return null;

    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(pCode))));
    const d = JSON.parse(jsonStr);

    const params: Partial<SolarParams> = {};
    if (d.t) params.systemType = d.t;
    if (typeof d.k === 'number') params.kwp = d.k;
    if (d.r) params.region = d.r;
    if (d.l) params.locationId = d.l;
    if (d.m) params.mountingType = d.m;
    if (typeof d.ti === 'number') params.tilt = d.ti;
    if (typeof d.az === 'number') params.azimuth = d.az;
    if (d.c) params.cellType = d.c;
    if (typeof d.d === 'number') params.annualConsumption = d.d;
    if (typeof d.s === 'number') params.storageKwh = d.s;
    if (typeof d.p === 'number') params.electricityPrice = d.p;
    if (typeof d.f === 'number') params.feedInTariff = d.f;
    if (d.rem) params.feedInRemunerationType = d.rem;
    if (typeof d.inv === 'number') params.customInvestmentEur = d.inv;
    if (typeof d.op === 'number') params.operatingCostRatePercent = d.op;

    return {
      params,
      name: d.n || undefined
    };
  } catch (e) {
    console.warn('Could not decode project payload from URL:', e);
    return null;
  }
}

/**
 * Lädt alle lokal im Browser gespeicherten Projekte
 */
export function loadSavedProjects(): SavedProject[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read saved projects from localStorage:', e);
    return [];
  }
}

/**
 * Speichert ein Projekt lokal im Browser
 */
export function saveProjectLocally(project: Omit<SavedProject, 'id' | 'createdAt'> & { id?: string }): SavedProject {
  const existing = loadSavedProjects();
  const id = project.id || `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const fullProject: SavedProject = {
    ...project,
    id,
    createdAt: new Date().toISOString()
  };

  const filtered = existing.filter(p => p.id !== id);
  const updated = [fullProject, ...filtered];
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save project to localStorage:', e);
  }
  return fullProject;
}

/**
 * Löscht ein lokal gespeichertes Projekt
 */
export function deleteSavedProject(id: string): void {
  const existing = loadSavedProjects();
  const updated = existing.filter(p => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete project from localStorage:', e);
  }
}
