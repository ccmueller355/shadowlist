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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeName } from '../types';
import { useAppTheme } from '../theme/useTheme';
import { themes } from '../theme/themes';

interface Props {
  visible: boolean;
  currentTheme: ThemeName;
  sortByCategory: boolean;
  hasDemoData: boolean;
  onThemeChange: (theme: ThemeName) => void;
  onToggleCategory: (value: boolean) => void;
  onLoadDemo: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function SettingsModal({
  visible,
  currentTheme,
  sortByCategory,
  hasDemoData,
  onThemeChange,
  onToggleCategory,
  onLoadDemo,
  onClearAll,
  onClose,
}: Props) {
  const t = useAppTheme();

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

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
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
              >
                <View style={styles.themeInfo}>
                  <Text style={[styles.themeLabel, active && styles.themeLabelActive]}>
                    {theme.label}
                  </Text>
                  <Text style={styles.themeDesc}>{theme.description}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioDot} />}
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
              <Text style={styles.rowLabel}>Sort by Category</Text>
            </View>
            <Switch
              value={sortByCategory}
              onValueChange={onToggleCategory}
              trackColor={{
                false: t.colors.border,
                true: t.colors.primary,
              }}
              thumbColor={t.colors.surface}
            />
          </View>

          {/* Load Demo Data */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              onLoadDemo();
              onClose();
            }}
          >
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="database-import"
                size={22}
                color={t.colors.primary}
              />
              <Text style={styles.rowLabel}>Load Demo Data</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={t.colors.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Clear All Data */}
          <TouchableOpacity style={styles.row} onPress={handleClearAll}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="delete-forever"
                size={22}
                color={t.colors.danger}
              />
              <Text style={[styles.rowLabel, styles.dangerText]}>Clear All Data</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={t.colors.danger}
            />
          </TouchableOpacity>

          <Text style={styles.footer}>ShadowList v1.0.0</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: '#ffffff', // overridden dynamically
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cccccc', // overridden dynamically
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
    color: '#000000',
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#888888',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  themeRowActive: {
    borderColor: '#cc4444',
  },
  themeInfo: {
    flex: 1,
    marginRight: 12,
  },
  themeLabel: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#555555',
  },
  themeLabelActive: {
    fontWeight: 'bold',
    color: '#cc4444',
  },
  themeDesc: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#cc4444',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cc4444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#000000',
  },
  dangerText: {
    color: '#cc0000',
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 8,
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
    marginTop: 24,
  },
});
