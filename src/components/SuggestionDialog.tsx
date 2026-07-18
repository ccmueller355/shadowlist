// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/useTheme';
import { useTranslation } from '../i18n/useTranslation';

interface Suggestion {
  label: string;
  icon?: string;
}

interface Props {
  visible: boolean;
  itemName: string;
  dietName: string;
  suggestions: Suggestion[];
  onAcceptSuggestion: (label: string) => void;
  onAddAnyway: () => void;
  onClose: () => void;
}

export function SuggestionDialog({
  visible,
  itemName,
  dietName,
  suggestions,
  onAcceptSuggestion,
  onAddAnyway,
  onClose,
}: Props) {
  const t = useAppTheme();
  const { t: tr } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.container, { backgroundColor: t.colors.surface }]}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="alert-circle" size={28} color={t.colors.danger} />
            <Text style={styles.title}>Diet Warning</Text>
          </View>

          <Text style={[styles.message, { color: t.colors.textSecondary }]}>
            {itemName} is not compatible with {dietName}.
          </Text>

          {suggestions.length > 0 && (
            <>
              <Text style={[styles.suggestionHeader, { color: t.colors.textPrimary }]}>
                {suggestions.length === 1
                  ? tr('warning.suggestion').replace('{alternative}', suggestions[0].label)
                  : 'Try one of these instead?'}
              </Text>
              {suggestions.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.suggestionRow, { backgroundColor: t.colors.checkedBg }]}
                  onPress={() => onAcceptSuggestion(s.label)}
                  accessibilityLabel={`Add ${s.label} instead`}
                >
                  {s.icon && (
                    <MaterialCommunityIcons
                      name={s.icon as any}
                      size={20}
                      color={t.colors.primary}
                    />
                  )}
                  <Text style={[styles.suggestionText, { color: t.colors.textPrimary }]}>{s.label}</Text>
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={20}
                    color={t.colors.primary}
                  />
                </TouchableOpacity>
              ))}
            </>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.addAnywayButton, { borderColor: t.colors.border }]}
              onPress={onAddAnyway}
              accessibilityLabel={tr('warning.addAnyway')}
            >
              <Text style={[styles.addAnywayText, { color: t.colors.textSecondary }]}>{tr('warning.addAnyway')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: t.colors.primary }]}
              onPress={onClose}
              accessibilityLabel={tr('general.cancel')}
            >
              <Text style={[styles.cancelText, { color: t.colors.background }]}>{tr('general.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: {
    borderRadius: 16,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  suggestionHeader: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  suggestionText: {
    fontFamily: 'monospace',
    fontSize: 15,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  addAnywayButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  addAnywayText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
  },
});
