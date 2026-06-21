// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { useStore } from '../store/useStore';
import { en } from './en';
import { de } from './de';

const translations = { en, de } as const;

type NestedKeyOf<Obj, Prefix extends string = ''> = {
  [K in keyof Obj & string]: Obj[K] extends Record<string, unknown>
    ? NestedKeyOf<Obj[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`
}[keyof Obj & string];

type TranslationKey = NestedKeyOf<typeof en>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

function interpolate(text: string, params?: Record<string, string>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
}

export function useTranslation() {
  const lang = useStore((s) => s.settings.lang);
  const dict = translations[lang] ?? en;

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    const text = getNestedValue(dict as unknown as Record<string, unknown>, key);
    return interpolate(text, params);
  };

  return { t, lang };
}
