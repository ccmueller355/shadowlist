// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { useEffect } from 'react';
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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeName, AppLang, DietId } from '../types';
import { useAppTheme } from '../theme/useTheme';
import { themes } from '../theme/themes';
import { DIET_PROFILES } from '../constants/diets';
import { useTranslation } from '../i18n/useTranslation';

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
  onClearAll: () => void;
  onClose: () => void;
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
  onClearAll,
  onClose,
}: Props) {
  const t = useAppTheme();
  const { t: tr } = useTranslation();

  // Back button → close modal
  useEffect(() => {
    if (!visible) return;
    const handler = () => { onClose(); return true; };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [visible, onClose]);

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all lists and items. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            onClearAll();
            onClose();
          },
        },
      ]
    );
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
              <Text style={styles.title}>Settings</Text>
              <TouchableOpacity
                onPress={onClose}
                accessibilityLabel="Close settings"
              >
                <MaterialCommunityIcons name="close" size={24} color={t.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Theme picker */}
            <Text style={styles.sectionLabel}>THEME</Text>
            {themeEntries.map(([key, theme]) => {
              const active = key === currentTheme;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.themeRow, active && styles.themeRowActive]}
                  onPress={() => onThemeChange(key)}
                  accessibilityLabel={`${tr('theme.' + String(key) + '.label')}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                >
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeLabel, active && styles.themeLabelActive]}>
                      {tr(('theme.' + String(key) + '.label') as any)}
                    </Text>
                    <Text style={styles.themeDesc}>{tr(('theme.' + String(key) + '.desc') as any)}</Text>
                  </View>
                  <View style={[styles.radio, active && { borderColor: t.colors.primary }]}>
                    {active && <View style={[styles.radioDot, { backgroundColor: t.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Sort by Category */}
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="sort-variant"
                  size={22}
                  color={t.colors.primary}
                />
                <Text style={styles.rowLabel}>{tr('settings.sortByCategory')}</Text>
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

            <View style={styles.divider} />

            {/* Diet picker */}
            <Text style={styles.sectionLabel}>{tr('settings.diet.label')}</Text>
            <TouchableOpacity
              style={[styles.themeRow, activeDiet === null && styles.themeRowActive]}
              onPress={() => onDietChange(null)}
              accessibilityLabel={tr('settings.diet.none')}
              accessibilityRole="radio"
              accessibilityState={{ selected: activeDiet === null }}
            >
              <View style={styles.themeInfo}>
                <Text style={[styles.themeLabel, activeDiet === null && styles.themeLabelActive]}>
                  {tr('settings.diet.none')}
                </Text>
                <Text style={styles.themeDesc}>{tr('settings.diet.descNone')}</Text>
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
                  style={[styles.themeRow, active && styles.themeRowActive]}
                  onPress={() => onDietChange(diet.id)}
                  accessibilityLabel={`Diet: ${tr(diet.nameKey as any)}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                >
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeLabel, active && styles.themeLabelActive]}>
                      {tr(diet.nameKey as any)}
                    </Text>
                    <Text style={styles.themeDesc}>{tr(diet.descriptionKey as any)}</Text>
                  </View>
                  <View style={[styles.radio, active && { borderColor: t.colors.primary }]}>
                    {active && <View style={[styles.radioDot, { backgroundColor: t.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Language toggle */}
            <Text style={styles.sectionLabel}>{tr('settings.language.label')}</Text>
            <View style={styles.langRow}>
              {langOptions.map((opt) => {
                const active = lang === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.langChip, active && styles.langChipActive]}
                    onPress={() => onLangChange(opt.key)}
                    accessibilityLabel={`Language: ${opt.label}`}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                  >
                    <Text style={[styles.langText, active && styles.langTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.divider} />

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
                <Text style={[styles.rowLabel, styles.dangerText]}>{tr('settings.clearAllData')}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color={t.colors.danger}
              />
            </TouchableOpacity>

            <Text style={styles.footer}>ShadowList v0.9.1</Text>
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
    color: '#888',
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
  themeRowActive: {
    backgroundColor: '#f0f0ff',
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: '600',
  },
  themeLabelActive: {
    color: '#6c5ce7',
  },
  themeDesc: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
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
    backgroundColor: '#e0e0e0',
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
  dangerText: {
    color: '#e74c3c',
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
    borderColor: '#ccc',
    alignItems: 'center',
  },
  langChipActive: {
    borderColor: '#6c5ce7',
    backgroundColor: '#f0f0ff',
  },
  langText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
  },
  langTextActive: {
    color: '#6c5ce7',
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});
