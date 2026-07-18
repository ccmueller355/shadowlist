// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { useStore } from '../store/useStore';
import { themes } from './themes';

export function useAppTheme() {
  const themeName = useStore((s) => s.settings.theme);
  return themes[themeName] || themes.fixer;
}
