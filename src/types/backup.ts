// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { ShoppingList, ShoppingItem, AppSettings } from './index';

export type BackupImportMode = 'replace' | 'merge';

export interface ShadowlistBackupData {
  lists: ShoppingList[];
  items: ShoppingItem[];
  settings: AppSettings;
}

export interface ShadowlistBackup {
  app: 'shadowlist';
  appVersion: string;
  schemaVersion: number;
  exportedAt: string;
  data: ShadowlistBackupData;
}
