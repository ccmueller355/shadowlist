// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  StyleSheet,
  Alert,
  BackHandler,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import { File, Directory, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeName, AppLang, DietId } from '../types';
import { useAppTheme } from '../theme/useTheme';
import { themes } from '../theme/themes';
import { DIET_PROFILES } from '../constants/diets';
import Constants from 'expo-constants';
import { useTranslation } from '../i18n/useTranslation';
import Toast from 'react-native-toast-message';

interface Props {
  visible: boolean;
  currentTheme: ThemeName;
  sortByCategory: boolean;
  activeDiet: DietId | null;
  lang: AppLang;
  onThemeChange: (theme: ThemeName) => void;
  onToggleCategory: (value: boolean) => void;
  onDietChange: (dietId: DietId | null) => void;
  onLangChange: (lang: AppLang) => void;
  onAddDemoData?: () => void;
  onClearAll: () => void;
  onGenerateTestData?: () => void;
  onGenerateExtremeData?: (totalItems?: number) => number;
  onClose: () => void;
  onExportBackup: () => Promise<string>;
  onImportBackup: (jsonString: string, mode: 'replace' | 'merge') => Promise<void>;
}

export function SettingsModal({
  visible,
  currentTheme,
  sortByCategory,
  activeDiet,
  lang,
  onThemeChange,
  onToggleCategory,
  onDietChange,
  onLangChange,
  onAddDemoData,
  onClearAll,
  onGenerateTestData,
  onGenerateExtremeData,
  onExportBackup,
  onImportBackup,
  onClose,
}: Props) {
  const t = useAppTheme();
  const { t: tr } = useTranslation();
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Back button → close modal
  useEffect(() => {
    if (!visible) return;
    const handler = () => { onClose(); return true; };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [visible, onClose]);

  const handleClearAll = () => {
    Alert.alert(
      tr('settings.clearAllConfirmTitle'),
      tr('settings.clearAllConfirmMessage'),
      [
        { text: tr('general.cancel'), style: 'cancel' },
        {
          text: tr('settings.deleteAll'),
          style: 'destructive',
          onPress: () => {
            onClearAll();
            onClose();
          },
        },
      ]
    );
  };

  const exportBackupHandler = async () => {
    try {
      const jsonString = await onExportBackup();
      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `shadowlist-backup-${dateStr}.json`;

      const shareFile = async () => {
        const file = new File(Paths.cache, fileName);
        if (!file.exists) {
          file.create({ overwrite: true });
        }
        file.write(jsonString);
        const canShare = await Sharing.isAvailableAsync();
        if (!canShare) {
          throw new Error('File sharing is not available on this device');
        }
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/json',
          dialogTitle: tr('settings.backup.exportDialogTitle'),
          UTI: 'public.json',
        });
        Toast.show({
          type: 'success',
          text1: tr('settings.backup.exported'),
          position: 'bottom',
        });
      };

      if (Platform.OS === 'android') {
        Alert.alert(
          tr('settings.backup.export'),
          tr('settings.backup.exportPrompt'),
          [
            {
              text: tr('settings.backup.saveToFolder'),
              onPress: async () => {
                try {
                  const dir = await Directory.pickDirectoryAsync();
                  const file = dir.createFile(fileName, 'application/json');
                  file.write(jsonString);
                  Toast.show({
                    type: 'success',
                    text1: tr('settings.backup.savedToFolder'),
                    text2: fileName,
                    position: 'bottom',
                  });
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : String(err);
                  if (msg.toLowerCase().includes('cancel')) return;
                  Toast.show({
                    type: 'error',
                    text1: tr('settings.backup.saveFailed'),
                    text2: msg,
                    position: 'bottom',
                  });
                }
              },
            },
            {
              text: tr('settings.backup.shareFile'),
              onPress: async () => {
                try {
                  await shareFile();
                } catch (err: unknown) {
                  Toast.show({
                    type: 'error',
                    text1: tr('settings.backup.shareFailed'),
                    text2: err instanceof Error ? err.message : String(err),
                    position: 'bottom',
                  });
                }
              },
            },
            { text: tr('general.cancel'), style: 'cancel' },
          ]
        );
      } else {
        await shareFile();
      }
    } catch (error: unknown) {
      Toast.show({
        type: 'error',
        text1: tr('settings.backup.exportFailed'),
        text2: error instanceof Error ? error.message : String(error),
        position: 'bottom',
      });
    }
  };

  const importBackupHandler = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json', 'text/plain', '*/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      const file = new File(asset.uri);
      const jsonString = await file.text();

      if (!jsonString.trim()) {
        Toast.show({
          type: 'error',
          text1: tr('settings.backup.emptyFile'),
          position: 'bottom',
        });
        return;
      }

      // Ask for mode: replace or merge
      Alert.alert(
        tr('settings.backup.importModeTitle'),
        tr('settings.backup.importModePrompt'),
        [
          {
            text: tr('settings.backup.replaceAll'),
            onPress: async () => {
              try {
                await onImportBackup(jsonString, 'replace');
                Toast.show({
                  type: 'success',
                  text1: tr('settings.backup.importedReplaced'),
                  position: 'bottom',
                });
                onClose();
              } catch (error: unknown) {
                Toast.show({
                  type: 'error',
                  text1: tr('settings.backup.importFailed'),
                  text2: error instanceof Error ? error.message : String(error),
                  position: 'bottom',
                });
              }
            },
          },
          {
            text: tr('settings.backup.mergeExisting'),
            onPress: async () => {
              try {
                await onImportBackup(jsonString, 'merge');
                Toast.show({
                  type: 'success',
                  text1: tr('settings.backup.importedMerged'),
                  position: 'bottom',
                });
                onClose();
              } catch (error: unknown) {
                Toast.show({
                  type: 'error',
                  text1: tr('settings.backup.importFailed'),
                  text2: error instanceof Error ? error.message : String(error),
                  position: 'bottom',
                });
              }
            },
          },
          { text: tr('general.cancel'), style: 'cancel' },
        ]
      );
    } catch (error: unknown) {
      Toast.show({
        type: 'error',
        text1: tr('settings.backup.readFailed'),
        text2: error instanceof Error ? error.message : String(error),
        position: 'bottom',
      });
    }
  };

  const themeEntries = Object.entries(themes) as [ThemeName, typeof themes.fixer][];
  const langOptions: { key: AppLang; label: string }[] = [
    { key: 'en', label: tr('settings.language.en') },
    { key: 'de', label: tr('settings.language.de') },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: t.colors.textPrimary }]}>Settings</Text>
              <TouchableOpacity
                onPress={onClose}
                accessibilityLabel="Close settings"
              >
                <MaterialCommunityIcons name="close" size={24} color={t.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Theme picker */}
            <Text style={[styles.sectionLabel, { color: t.colors.textSecondary }]}>THEME</Text>
            {themeEntries.map(([key, theme]) => {
              const active = key === currentTheme;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.themeRow, active && { backgroundColor: t.colors.checkedBg }]}
                  onPress={() => onThemeChange(key)}
                  accessibilityLabel={tr(('theme.' + String(key) + '.label') as any)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                >
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeLabel, active && { color: t.colors.primary }]}>
                      {tr(('theme.' + String(key) + '.label') as any)}
                    </Text>
                    <Text style={[styles.themeDesc, { color: t.colors.textSecondary }]}>{tr(('theme.' + String(key) + '.desc') as any)}</Text>
                  </View>
                  <View style={[styles.radio, active && { borderColor: t.colors.primary }]}>
                    {active && <View style={[styles.radioDot, { backgroundColor: t.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* Sort by Category */}
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="sort-variant"
                  size={22}
                  color={t.colors.primary}
                />
                <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('settings.sortByCategory')}</Text>
              </View>
              <Switch
                value={sortByCategory}
                onValueChange={onToggleCategory}
                trackColor={{
                  false: t.colors.border,
                  true: t.colors.primary,
                }}
                thumbColor={t.colors.surface}
                accessibilityLabel={tr('settings.sortByCategory')}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* Diet picker */}
            <Text style={[styles.sectionLabel, { color: t.colors.secondary }]}>{tr('settings.diet.label')}</Text>
            <TouchableOpacity
              style={[styles.themeRow, activeDiet === null && { backgroundColor: t.colors.checkedBg }]}
              onPress={() => onDietChange(null)}
              accessibilityLabel={tr('settings.diet.none')}
              accessibilityRole="radio"
              accessibilityState={{ selected: activeDiet === null }}
            >
              <View style={styles.themeInfo}>
                <Text style={[styles.themeLabel, activeDiet === null && { color: t.colors.primary }]}>
                  {tr('settings.diet.none')}
                </Text>
                <Text style={[styles.themeDesc, { color: t.colors.textSecondary }]}>{tr('settings.diet.descNone')}</Text>
              </View>
              <View style={[styles.radio, activeDiet === null && { borderColor: t.colors.primary }]}>
                {activeDiet === null && <View style={[styles.radioDot, { backgroundColor: t.colors.primary }]} />}
              </View>
            </TouchableOpacity>
            {DIET_PROFILES.map((diet) => {
              const active = activeDiet === diet.id;
              return (
                <TouchableOpacity
                  key={diet.id}
                  style={[styles.themeRow, active && { backgroundColor: t.colors.checkedBg }]}
                  onPress={() => onDietChange(diet.id)}
                  accessibilityLabel={`Diet: ${tr(diet.nameKey as any)}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                >
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeLabel, active && { color: t.colors.primary }]}>
                      {tr(diet.nameKey as any)}
                    </Text>
                    <Text style={[styles.themeDesc, { color: t.colors.textSecondary }]}>{tr(diet.descriptionKey as any)}</Text>
                  </View>
                  <View style={[styles.radio, active && { borderColor: t.colors.primary }]}>
                    {active && <View style={[styles.radioDot, { backgroundColor: t.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* Language toggle */}
            <Text style={[styles.sectionLabel, { color: t.colors.textSecondary }]}>{tr('settings.language.label')}</Text>
            <View style={styles.langRow}>
              {langOptions.map((opt) => {
                const active = lang === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.langChip, { borderColor: active ? t.colors.primary : t.colors.border, backgroundColor: active ? t.colors.checkedBg : 'transparent' }]}
                    onPress={() => onLangChange(opt.key)}
                    accessibilityLabel={`Language: ${opt.label}`}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                  >
                    <Text style={[styles.langText, active && { color: t.colors.primary }]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* Backup section */}
            <Text style={[styles.sectionLabel, { color: t.colors.textSecondary }]}>{tr('settings.backup.label')}</Text>
            <TouchableOpacity
              style={styles.row}
              onPress={exportBackupHandler}
              accessibilityLabel={tr('settings.backup.export')}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="folder-download-outline" size={22} color={t.colors.primary} />
                <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('settings.backup.export')}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={t.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={importBackupHandler}
              accessibilityLabel={tr('settings.backup.import')}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="folder-upload-outline" size={22} color={t.colors.primary} />
                <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('settings.backup.import')}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={t.colors.primary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* Load Demo Data */}
            {__DEV__ && onAddDemoData && (
              <TouchableOpacity
                style={styles.row}
                onPress={() => { onAddDemoData(); Alert.alert('Demo Data', 'Demo lists loaded.'); }}
                accessibilityLabel={tr('general.loadDemoData')}
              >
                <View style={styles.rowLeft}>
                  <MaterialCommunityIcons
                    name="database-outline"
                    size={22}
                    color={t.colors.primary}
                  />
                  <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('general.loadDemoData')}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={t.colors.primary}
                />
              </TouchableOpacity>
            )}

            {/* Clear All Data */}
            <TouchableOpacity
              style={styles.row}
              onPress={handleClearAll}
              accessibilityLabel={tr('settings.clearAllData')}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={22}
                  color={t.colors.danger}
                />
                <Text style={[styles.rowLabel, { color: t.colors.danger }]}>{tr('settings.clearAllData')}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color={t.colors.danger}
              />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

            {/* About */}
            <TouchableOpacity
              style={styles.row}
              onPress={() => setAboutExpanded((prev) => !prev)}
              accessibilityLabel={tr('settings.about.title')}
              accessibilityRole="button"
              accessibilityState={{ expanded: aboutExpanded }}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={22}
                  color={t.colors.primary}
                />
                <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('settings.about.title')}</Text>
              </View>
              <MaterialCommunityIcons
                name={aboutExpanded ? 'chevron-down' : 'chevron-right'}
                size={22}
                color={t.colors.primary}
              />
            </TouchableOpacity>

            {aboutExpanded && (
              <View style={[styles.aboutCard, { borderColor: t.colors.border, backgroundColor: t.colors.background }]}>
                <Text style={[styles.aboutText, { color: t.colors.textPrimary }]}>
                  {tr('settings.about.version')}: {Constants.expoConfig?.version ?? '0.0.0'}
                </Text>
                <Text style={[styles.aboutText, { color: t.colors.textSecondary }]}>
                  {tr('settings.about.license')}
                </Text>
                <Text style={[styles.aboutSectionTitle, { color: t.colors.textSecondary }]}>
                  {tr('settings.about.ossLabel')}
                </Text>
                <Text style={[styles.aboutText, { color: t.colors.textSecondary }]}>
                  React Native, Expo, Zustand, React Navigation, React Native Paper, MaterialCommunityIcons
                </Text>
                <TouchableOpacity
                  style={styles.aboutLinkRow}
                  onPress={() => Linking.openURL('https://github.com/ccmueller355/shadowlist')}
                  accessibilityLabel={tr('settings.about.sourceCode')}
                  accessibilityRole="link"
                >
                  <Text style={[styles.aboutLinkText, { color: t.colors.primary }]}>
                    {tr('settings.about.sourceCode')}
                  </Text>
                  <MaterialCommunityIcons name="open-in-new" size={16} color={t.colors.primary} />
                </TouchableOpacity>
              </View>
            )}

            {__DEV__ && onGenerateTestData && (
              <>
                <View style={[styles.divider, { backgroundColor: t.colors.border }]} />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    const count = onGenerateTestData();
                    Alert.alert(
                      'Test Data',
                      `${count} test lists generated with ${200}+ item pool.`,
                    );
                  }}
                  accessibilityLabel={tr('general.generateTestData')}
                >
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="flask-outline"
                      size={22}
                      color={t.colors.primary}
                    />
                    <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>{tr('general.generateTestData')}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={t.colors.primary}
                  />
                </TouchableOpacity>
              </>
            )}

            {__DEV__ && onGenerateExtremeData && (
              <>
                <View style={[styles.divider, { backgroundColor: t.colors.border }]} />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    const count = onGenerateExtremeData(500);
                    Alert.alert('Performance Test', `${count} lists generated with ~500 items.`);
                  }}
                  accessibilityLabel="Generate 500 test items"
                >
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="chart-bell-curve"
                      size={22}
                      color={t.colors.primary}
                    />
                    <Text style={[styles.rowLabel, { color: t.colors.textPrimary }]}>Generate 500 Items</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={t.colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    const count = onGenerateExtremeData(5000);
                    Alert.alert('Stress Data', `${count} lists generated with ~5,000 items.`);
                  }}
                  accessibilityLabel="Generate 5000 stress items"
                >
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="alert-octagon-outline"
                      size={22}
                      color={t.colors.danger}
                    />
                    <Text style={[styles.rowLabel, { color: t.colors.danger }]}>Generate 5,000 Items</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={t.colors.danger}
                  />
                </TouchableOpacity>
              </>
            )}

            <Text style={[styles.footer, { color: t.colors.textSecondary }]}>ShadowList v{Constants.expoConfig?.version ?? '0.0.0'} · Aethelred Cybernetics</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginTop: 4,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: '600',
  },
  themeDesc: {
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowLabel: {
    fontFamily: 'monospace',
    fontSize: 15,
  },
  langRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  langText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutCard: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  aboutSectionTitle: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
  },
  aboutText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  aboutLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  aboutLinkText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },
});
