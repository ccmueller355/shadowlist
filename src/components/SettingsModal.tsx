import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';

interface Props {
  visible: boolean;
  sortByCategory: boolean;
  hasDemoData: boolean;
  onToggleCategory: (value: boolean) => void;
  onLoadDemo: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function SettingsModal({
  visible,
  sortByCategory,
  hasDemoData,
  onToggleCategory,
  onLoadDemo,
  onClearAll,
  onClose,
}: Props) {
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color={cyberpunkTheme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Sort by Category */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="sort-variant"
                size={22}
                color={cyberpunkTheme.colors.primary}
              />
              <Text style={styles.rowLabel}>Sort by Category</Text>
            </View>
            <Switch
              value={sortByCategory}
              onValueChange={onToggleCategory}
              trackColor={{
                false: cyberpunkTheme.colors.border,
                true: cyberpunkTheme.colors.primary,
              }}
              thumbColor={cyberpunkTheme.colors.surface}
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
                color={cyberpunkTheme.colors.primary}
              />
              <Text style={styles.rowLabel}>Load Demo Data</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={cyberpunkTheme.colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Clear All Data */}
          <TouchableOpacity style={styles.row} onPress={handleClearAll}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="delete-forever"
                size={22}
                color={cyberpunkTheme.colors.danger}
              />
              <Text style={[styles.rowLabel, styles.dangerText]}>Clear All Data</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={cyberpunkTheme.colors.danger}
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
    paddingHorizontal: cyberpunkTheme.spacing.lg,
  },
  container: {
    backgroundColor: cyberpunkTheme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.primary,
    padding: cyberpunkTheme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: cyberpunkTheme.spacing.lg,
  },
  title: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    color: cyberpunkTheme.colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: cyberpunkTheme.spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
  },
  rowLabel: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 14,
    color: cyberpunkTheme.colors.textPrimary,
  },
  dangerText: {
    color: cyberpunkTheme.colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: cyberpunkTheme.colors.border,
    marginVertical: cyberpunkTheme.spacing.sm,
  },
  footer: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    color: cyberpunkTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: cyberpunkTheme.spacing.lg,
  },
});
