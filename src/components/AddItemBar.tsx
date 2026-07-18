// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { debounce } from '../utils/debounce';
import { useTranslation } from '../i18n/useTranslation';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  listId: string;
  recentBought: ShoppingItem[];
  onAddItem: (description: string) => void;
  onReAddItem: (itemId: string) => void;
  onSearchChange: (query: string) => void;
}

export function AddItemBar({ listId, recentBought, onAddItem, onReAddItem, onSearchChange }: Props) {
  const { t: tr } = useTranslation();
  const cyberpunkTheme = useAppTheme();
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<ShoppingItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);

  const debouncedSuggest = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length < 1) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        const lower = query.toLowerCase();
        const matches = recentBought
          .filter((item) => item.description.toLowerCase().includes(lower))
          .slice(0, 5);
        setSuggestions(matches);
        setShowSuggestions(matches.length > 0);
      }, 300),
    [recentBought]
  );

  const debouncedSearch = useMemo(
    () => debounce((q: string) => onSearchChange(q), 200),
    [onSearchChange]
  );

  const handleChange = useCallback(
    (value: string) => {
      setText(value);
      debouncedSuggest(value);
      debouncedSearch(value);
    },
    [debouncedSuggest, debouncedSearch]
  );

  const clearInput = useCallback(() => {
    setText('');
    setSuggestions([]);
    setShowSuggestions(false);
    debouncedSuggest.cancel();
    debouncedSearch.cancel();
    onSearchChange('');
  }, [onSearchChange, debouncedSuggest, debouncedSearch]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddItem(trimmed);
    clearInput();
  };

  const handleSelectSuggestion = (item: ShoppingItem) => {
    onReAddItem(item.id);
    clearInput();
  };

  const showFilterBadge = text.length > 0;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.inputRow, focused && styles.inputRowFocused]}
        onPress={() => inputRef.current?.focus()}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={focused ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary}
        />
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: cyberpunkTheme.colors.textPrimary }]}
          placeholder={tr('general.addItemPlaceholder')}
          placeholderTextColor={cyberpunkTheme.colors.textSecondary}
          value={text}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          autoComplete="off"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        {showFilterBadge ? (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <MaterialCommunityIcons name="close-circle" size={20} color={cyberpunkTheme.colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={22} color="#0a0a0a" />
        </TouchableOpacity>
      </Pressable>

      {/* Auto-suggest dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.recentLabel}>RECENTLY BOUGHT</Text>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.suggestionRow}
              onPress={() => handleSelectSuggestion(item)}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color={cyberpunkTheme.colors.primary}
              />
              <Text style={styles.suggestionText}>{item.description}</Text>
              {item.qualifier ? (
                <Text style={styles.suggestionQualifier}>{item.qualifier}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    gap: 6,
  },
  inputRowFocused: {
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 15,
    paddingVertical: 10,
    minWidth: 0,
  },
  clearButton: {
    padding: 2,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  recentLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  suggestionText: {
    fontFamily: 'monospace',
    fontSize: 14,
    flex: 1,
  },
  suggestionQualifier: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
