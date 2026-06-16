import { useStore } from '../store/useStore';
import { themes } from './themes';

export function useAppTheme() {
  const themeName = useStore((s) => s.settings.theme);
  return themes[themeName] || themes.fixer;
}
