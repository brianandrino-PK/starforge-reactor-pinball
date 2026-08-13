const KEY = "cosmic-pinball:v1";
export const DEFAULT_PREFS = { sfxMuted: false, musicMuted: false, best: 0 };

export function loadPreferences(storage) {
  try {
    const raw = storage?.getItem(KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw);
    return {
      sfxMuted: parsed.sfxMuted === true,
      musicMuted: parsed.musicMuted === true,
      best: Number.isFinite(parsed.best) && parsed.best >= 0 ? parsed.best : 0,
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePreferences(storage, prefs) {
  try {
    storage?.setItem(KEY, JSON.stringify({
      sfxMuted: prefs.sfxMuted === true,
      musicMuted: prefs.musicMuted === true,
      best: Math.max(0, Number(prefs.best) || 0),
    }));
    return true;
  } catch {
    return false;
  }
}
