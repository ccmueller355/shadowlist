import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { debounce } from '../utils/debounce';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';

interface Props {
  listId: string;
  recentBought: ShoppingItem[];
  onAddItem: (description: string) => void;
}

export function AddItemBar({ listId, recentBought, onAddItem }: Props) {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<ShoppingItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

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

  const handleChange = useCallback(
    (value: string) => {
      setText(value);
      debouncedSuggest(value);
    },
    [debouncedSuggest]
  );

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddItem(trimmed);
    setText('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (item: ShoppingItem) => {
    onAddItem(item.description);
    setText('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      {/* Search / Add field */}
      <View style={[styles.inputRow, searchFocused && styles.inputRowFocused]}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={cyberpunkTheme.colors.textSecondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Search or add item..."
          placeholderTextColor={cyberpunkTheme.colors.textSecondary}
          value={text}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => {
            setSearchFocused(false);
            // Delay hiding so tap on suggestion works
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={22} color="#0a0a0a" />
        </TouchableOpacity>
      </View>

      {/* Auto-suggest dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
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
    backgroundColor: cyberpunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    borderRadius: cyberpunkTheme.borderRadius,
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    gap: 6,
  },
  inputRowFocused: {
    borderColor: cyberpunkTheme.colors.primary,
    shadowColor: cyberpunkTheme.colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 15,
    color: cyberpunkTheme.colors.textPrimary,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: cyberpunkTheme.colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionsContainer: {
    backgroundColor: cyberpunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.primary,
    borderTopWidth: 0,
    borderBottomLeftRadius: cyberpunkTheme.borderRadius,
    borderBottomRightRadius: cyberpunkTheme.borderRadius,
    overflow: 'hidden',
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: cyberpunkTheme.spacing.md,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: cyberpunkTheme.colors.border,
  },
  suggestionText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 14,
    color: cyberpunkTheme.colors.textPrimary,
    flex: 1,
  },
  suggestionQualifier: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.primary,
    fontWeight: 'bold',
  },
});
